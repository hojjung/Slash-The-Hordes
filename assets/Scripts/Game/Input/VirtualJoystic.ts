// VirtualJoystic.ts - 최소 수정 (Canvas 기준으로만 변경)
import { _decorator, Component, Node, Vec2, Vec3, input, Input, EventTouch, EventMouse, UITransform, CCFloat, view, sys, Canvas } from "cc";
const { ccclass, property } = _decorator;

@ccclass("VirtualJoystic")
export class VirtualJoystic extends Component {
    declare node: Node;
    @property(CCFloat) maxDistance: number = 100;
    @property(Node) knob: Node = null!;

    private initialized = false;
    private using = false;
    private touchId = -1;

    private parentUI!: UITransform; // ✅ Canvas UITransform 저장
    private startUI: Vec2 = new Vec2();
    private lastUI: Vec2 = new Vec2();
    private startLocal: Vec3 = new Vec3();
    private tmpV3: Vec3 = new Vec3();

    onLoad() {
        // ✅ 부모 대신 Canvas를 찾아서 저장
        let p = this.node.parent;
        while (p) {
            if (p.getComponent(Canvas)) {
                this.parentUI = p.getComponent(UITransform)!;
                break;
            }
            p = p.parent;
        }
    }

    public init(): void {
        if (this.initialized) return;
        this.initialized = true;

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        if (!sys.isMobile) {
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }

        view.on("canvas-resize", this.onCanvasResize, this);
        this.deactivate();
    }

    onDestroy() {
        if (!this.initialized) return;
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        if (!sys.isMobile) {
            input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }
        view.off("canvas-resize", this.onCanvasResize, this);
    }

    public getAxis(): Vec2 {
        if (!this.using) return new Vec2();
        const r = this.localRadius();
        const p = this.knob.position;
        return new Vec2(p.x / r, p.y / r);
    }

    private onTouchStart = (e: EventTouch) => {
        if (this.using) return;
        this.touchId = e.getID();
        const p = e.getUILocation();
        this.activateAt(p);
    };
    private onTouchMove = (e: EventTouch) => {
        if (!this.using || e.getID() !== this.touchId) return;
        const p = e.getUILocation();
        this.lastUI.set(p);
        this.updateKnobFromUI(p);
    };
    private onTouchEnd = (e: EventTouch) => {
        if (!this.using || (this.touchId !== -1 && e.getID() !== this.touchId)) return;
        this.deactivate();
    };

    private onMouseDown = (e: EventMouse) => {
        if (this.using) return;
        this.touchId = -2;
        this.activateAt(e.getUILocation());
    };
    private onMouseMove = (e: EventMouse) => {
        if (!this.using || this.touchId !== -2) return;
        const p = e.getUILocation();
        this.lastUI.set(p);
        this.updateKnobFromUI(p);
    };
    private onMouseUp = (_e: EventMouse) => {
        if (this.touchId !== -2) return;
        this.deactivate();
    };

    // ✅ 원래 코드 그대로 (parentUI가 이제 Canvas)
    private activateAt(uiPos: Vec2) {
        this.using = true;
        this.node.active = true;

        this.startUI.set(uiPos);
        this.lastUI.set(uiPos);

        this.tmpV3.set(uiPos.x, uiPos.y, 0);
        this.startLocal.set(this.parentUI.convertToNodeSpaceAR(this.tmpV3));

        this.node.setPosition(this.startLocal);
        this.knob.setPosition(0, 0, 0);
    }

    private deactivate() {
        this.using = false;
        this.touchId = -1;
        this.node.active = false;
        this.knob.setPosition(0, 0, 0);
    }

    private updateKnobFromUI(uiPos: Vec2) {
        this.tmpV3.set(uiPos.x, uiPos.y, 0);
        const curLocal = this.parentUI.convertToNodeSpaceAR(this.tmpV3);

        let dx = curLocal.x - this.startLocal.x;
        let dy = curLocal.y - this.startLocal.y;

        const r = this.localRadius();
        const len = Math.hypot(dx, dy);
        if (len > r && len > 0) {
            const m = r / len;
            dx *= m;
            dy *= m;
        }

        this.knob.setPosition(dx, dy, 0);
    }

    private localRadius(): number {
        const s = this.node.worldScale;
        const sxy = Math.max(s.x, s.y);
        return sxy > 0 ? this.maxDistance / sxy : this.maxDistance;
    }

    private onCanvasResize = () => {
        if (!this.using) return;
        this.tmpV3.set(this.startUI.x, this.startUI.y, 0);
        this.startLocal.set(this.parentUI.convertToNodeSpaceAR(this.tmpV3));
        this.node.setPosition(this.startLocal);
        this.updateKnobFromUI(this.lastUI);
    };
}

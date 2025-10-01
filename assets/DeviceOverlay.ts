// CanvasFixer.ts
// Canvas 노드에 직접 붙여라.
// 프로젝트 설정(720x1280, FitHeight)이 런타임에 제대로 안 먹을 때 강제 적용

import { _decorator, Component, Canvas, view, Size, screen } from "cc";
const { ccclass, executeInEditMode } = _decorator;

@ccclass("CanvasFixer")
@executeInEditMode()
export default class CanvasFixer extends Component {
    onLoad() {
        this.forceCanvasSettings();
    }

    start() {
        // 한 번 더 확실하게 적용
        this.scheduleOnce(() => {
            this.forceCanvasSettings();
        }, 0.1);
    }

    forceCanvasSettings() {
        const canvas = this.getComponent(Canvas);
        if (!canvas) {
            console.error("[CanvasFixer] Canvas 컴포넌트가 없음!");
            return;
        }

        // 현재 상태 로그
        console.log("=== Canvas 강제 수정 전 ===");
        console.log("Design Resolution:", canvas.de);
        console.log("Fit Height:", canvas.fitHeight);
        console.log("Fit Width:", canvas.fitWidth);

        // 강제 설정
        canvas.designResolution = new Size(720, 1280);
        canvas.fitHeight = true;
        canvas.fitWidth = false;

        // Canvas 내부 갱신 강제 실행
        (canvas as any)._thisOnResized?.();
        canvas["_alignWithScreen"]?.();

        // 적용 후 로그
        const frameSize = screen.windowSize;
        const designRatio = 720 / 1280; // 0.5625
        const screenRatio = frameSize.width / frameSize.height;

        console.log("=== Canvas 강제 수정 후 ===");
        console.log("Design Resolution:", canvas.designResolution);
        console.log("Node Size:", this.node.getComponent("cc.UITransform").contentSize);
        console.log("Screen Size:", frameSize);
        console.log("Design Ratio:", designRatio.toFixed(4));
        console.log("Screen Ratio:", screenRatio.toFixed(4));
        console.log("Ratio Diff:", Math.abs(designRatio - screenRatio).toFixed(4));
    }
}

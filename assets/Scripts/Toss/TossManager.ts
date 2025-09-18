// TossManager.ts
import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

@ccclass("TossManager")
export class TossManager extends Component {
    // 토스 포인트 지급 예시
    async givePoints(amount: number) {
        if (window.TossApp) {
            try {
                await window.TossApp.givePoints({
                    amount: amount,
                    reason: "game_reward"
                });
            } catch (error) {
                console.error("포인트 지급 실패:", error);
            }
        }
    }

    // 리더보드 점수 제출
    async submitScore(score: number) {
        if (window.TossApp) {
            try {
                await window.TossApp.submitLeaderboard({
                    score: score,
                    metadata: { stage: 1 }
                });
            } catch (error) {
                console.error("점수 제출 실패:", error);
            }
        }
    }
}

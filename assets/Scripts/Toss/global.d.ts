// global.d.ts
declare global {
    interface Window {
        TossApp?: {
            givePoints: (params: any) => Promise<void>;
            submitLeaderboard: (params: any) => Promise<void>;
            showAd: () => Promise<void>;
            // 기타 토스 API
        };
    }
}
export {};

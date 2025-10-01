// granite.config.ts
import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
    appName: "horde-survival",
    brand: {
        displayName: "호드 서바이벌",
        primaryColor: "#3182F6",
        icon: "https://hojjung.github.io/SlashHordeIcon/icon.png?v=20250925",
        bridgeColorMode: "inverted"
    },
    navigationBar: {
        withBackButton: true,
        withHomeButton: false
        // 필요하면 초기 액세서리 버튼 1개:
        // initialAccessoryButton: { id: "mypage", title: "마이", icon: { name: "icon-user-mono" } },
    },
    web: {
        host: "localhost",
        port: 5173,
        commands: { dev: "vite", build: "tsc -b && vite build" }
    },
    permissions: [],
    outdir: "dist"
});

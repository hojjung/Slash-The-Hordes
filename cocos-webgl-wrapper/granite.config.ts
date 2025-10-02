// granite.config.ts
import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "horde-survival",
  brand: {
    displayName: "호드 서바이벌",
    primaryColor: "#3182F6",
    icon: "https://hojjung.github.io/SlashHordeIcon/icon.png?v=20250925",
    bridgeColorMode: "inverted",
  },
  navigationBar: {
    withBackButton: true,
    withHomeButton: false,
  },
  webViewProps: {
    type: "game",  // 추가 - 게임 타입 명시
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: { dev: "vite", build: "tsc -b && vite build" },
  },
  permissions: [],
  outdir: "dist",
});

import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
    appName: "horde-survival",
    brand: {
        displayName: "호드 서바이벌",
        primaryColor: "#FF0000",
        icon: null,
        bridgeColorMode: "inverted"
    },
    web: {
        host: "localhost",
        port: 7456,
        commands: {
            dev: 'echo "dev"',
            build: 'echo "build"'
        }
    },
    permissions: [],
    webViewProps: {
        type: "game"
    },
    outdir: "build/web-mobile"
});

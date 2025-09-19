import { useEffect } from "react";

const CocosCanvas = () => {
    useEffect(() => {
        const container = document.getElementById("cocos-container");
        if (!container) return;

        container.innerHTML = `
            <div id="GameDiv" cc_exact_fit_screen="true" style="width: 100%; height: 100%;">
                <div id="Cocos3dGameContainer">
                    <canvas id="GameCanvas" tabindex="99"></canvas>
                </div>
            </div>
        `;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/style.css";
        document.head.appendChild(link);

        const initGame = async () => {
            const settingsRes = await fetch("/src/settings.json");
            window._CCSettings = await settingsRes.json();

            await loadScript("/src/polyfills.bundle.js");
            await loadScript("/src/system.bundle.js");

            // import-map 이제 경로 수정 필요없음
            const importMapScript = document.createElement("script");
            importMapScript.src = "/src/import-map.json";
            importMapScript.type = "systemjs-importmap";
            document.head.appendChild(importMapScript);

            await new Promise((resolve) => setTimeout(resolve, 100));

            if (window.System) {
                System.import("./index.js").catch(console.error);
            }
        };

        function loadScript(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        initGame().catch(console.error);
    }, []);

    return <div id="cocos-container" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default CocosCanvas;

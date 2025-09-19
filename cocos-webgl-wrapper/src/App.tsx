// src/App.tsx
import CocosCanvas from "./CocosCanvas"; // UnityCanvas 대신

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <CocosCanvas />
        </div>
    );
}

export default App;

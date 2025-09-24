// src/App.tsx
import "./index.css";
import CocosCanvas from "./CocosCanvas";
import RatingBadge from "./components/RatingBadge";
import { ExitConfirmModal, useExitConfirm } from "./components/ExitConfirm";

const APP_NAME = "호드 서바이벌";

export default function App() {
  const { open, setOpen } = useExitConfirm();

  return (
    <>
      {/* 캔버스는 전체 화면 고정 */}
      <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}>
        <CocosCanvas />
      </div>
      
      {/* 오버레이 요소들 */}
      <RatingBadge text="전체이용가" />
      
      <ExitConfirmModal
        open={open}
        appName={APP_NAME}
        onCancel={() => setOpen(false)}
        onExit={() => {
          setOpen(false);
          if (history.length > 1) history.back();
          else window.close();
        }}
      />
    </>
  );
}
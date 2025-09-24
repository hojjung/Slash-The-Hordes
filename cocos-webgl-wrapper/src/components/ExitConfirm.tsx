// src/components/ExitConfirm.tsx
import { useEffect, useState } from "react";

export function useExitConfirm() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); setOpen(true); return ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);
  return { open, setOpen };
}

export function ExitConfirmModal(
  { open, appName, onCancel, onExit }:
  { open:boolean; appName:string; onCancel:()=>void; onExit:()=>void; }
) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-sheet">
        <h3 style={{margin:0}}>{appName}</h3>
        <p style={{marginTop:8}}>게임을 종료하시겠어요?</p>
        <div style={{display:"flex",gap:8,marginTop:16,justifyContent:"flex-end"}}>
          <button onClick={onCancel}>취소</button>
          <button onClick={onExit}>종료</button>
        </div>
      </div>
    </div>
  );
}

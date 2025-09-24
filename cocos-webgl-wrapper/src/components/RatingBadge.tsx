// src/components/RatingBadge.tsx
import { useEffect, useState } from "react";

export default function RatingBadge({ text }: { text: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div className="rating-badge" role="status" aria-live="polite">
      <img src="/content.png" alt="이용등급 아이콘" loading="eager" />
      <span>이용등급</span>
      <span style={{ fontWeight: 800 }}>{text}</span>
    </div>
  );
}

import { useRef, useState } from "react";

export function useCursorAvatar(initialPosition = { x: 50, y: 80 }) {
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const [pointerPosition, setPointerPosition] = useState(initialPosition);
  const [showPointerSkin, setShowPointerSkin] = useState(false);

  const updatePointerFromEvent = (clientX: number, clientY: number) => {
    const arena = arenaRef.current;
    if (!arena) return;

    const rect = arena.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setPointerPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const bindCursorAvatar = {
    ref: arenaRef,
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      updatePointerFromEvent(e.clientX, e.clientY);
      if (e.pointerType === "mouse") setShowPointerSkin(true);
    },
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
      updatePointerFromEvent(e.clientX, e.clientY);
      if (e.pointerType === "mouse") setShowPointerSkin(true);
    },
    onPointerLeave: () => setShowPointerSkin(false),
  };

  return {
    bindCursorAvatar,
    pointerPosition,
    showPointerSkin,
    setPointerPosition,
    setShowPointerSkin,
  };
}

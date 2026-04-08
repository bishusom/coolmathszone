import React from "react";

interface CursorAvatarOverlayProps {
  activeSkinEmoji: string;
  pointerPosition: { x: number; y: number };
  visible: boolean;
}

export default function CursorAvatarOverlay({
  activeSkinEmoji,
  pointerPosition,
  visible,
}: CursorAvatarOverlayProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `${pointerPosition.x}%`,
        top: `${pointerPosition.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 60,
        pointerEvents: "none",
        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.45))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(34,211,238,0.18) 45%, rgba(0,0,0,0.12) 100%)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(6px)",
          fontSize: 24,
        }}
      >
        {activeSkinEmoji}
      </div>
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 0 12px rgba(255,255,255,0.9)",
        }}
      />
    </div>
  );
}

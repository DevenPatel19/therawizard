import React from "react";
import MagicalParticles from "../ui/MagicalParticles.jsx";

export default function SpellFormLayout({ children, flySpell }) {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Gradient background fixed behind everything */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black -z-20" />

      {/* MagicalParticles fixed behind content */}
      <MagicalParticles
        flySpell={flySpell}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content container above particles */}
      <div className="relative z-10 p-8 flex justify-center">{children}</div>
    </div>
  );
}

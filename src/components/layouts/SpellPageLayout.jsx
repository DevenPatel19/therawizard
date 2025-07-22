import MagicalParticles from "../ui/MagicalParticles";

export default function SpellPageLayout({ children, flySpell }) {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black -z-20" />
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
      <div className="relative z-10 p-8 max-w-xl mx-auto">{children}</div>
    </div>
  );
}

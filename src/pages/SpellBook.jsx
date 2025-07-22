import  { useState,  } from "react";
import SpellCard from "../components/SpellCard.jsx";
import MagicalParticles from "../components/ui/MagicalParticles.jsx";

const SpellBook = ({ spells }) => {
  const [selectedSpell, setSelectedSpell] = useState(null);

  const handleCastSpell = (spell) => {
    setSelectedSpell(spell);
    console.log(`Casting ${spell.name}! ✨`);
  };

  return (
    <div
      className="relative  min-h-screen bg-gradient-to-b from-indigo-900  to-black text-white p-10
                 font-mystical"
      style={{
        fontFamily:
          "'Cinzel', serif, 'Cormorant Garamond', serif, 'Playfair Display', serif",
      }}
    >
      <MagicalParticles />

      <h1
        className="text-5xl font-extrabold mb-12 text-center tracking-widest drop-shadow-lg"
        style={{ textShadow: "0 0 20px rgba(179,136,255,0.9)" }}
      >
        ✨ The  Spellbook ✨
        
      </h1>
      <h2  className="text-3xl font-extrabold mb-12 text-center tracking-widest drop-shadow-lg
      shimmer-text"
        style={{ textShadow: "0 0 20px rgba(179,136,255,0.9)" }}>
        cogitationes bonae
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {spells.map((spell, index) => (
          <SpellCard key={index} spell={spell} onCast={handleCastSpell} />
        ))}
      </div>

      {selectedSpell && (
        <div
          className="fixed bottom-12 right-12 bg-purple-900 bg-opacity-80 p-6 rounded-3xl shadow-2xl max-w-xs
                     backdrop-blur-sm text-center animate-fadeIn"
          style={{
            boxShadow:
              "0 0 20px 5px rgba(179,136,255,0.8), inset 0 0 10px 2px rgba(147,71,255,0.7)",
            fontFamily:
              "'Cinzel', serif, 'Cormorant Garamond', serif, 'Playfair Display', serif",
          }}
        >
          <h3
            className="text-2xl font-bold mb-3 flex justify-center items-center gap-3"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.8)" }}
          >
            <span className="text-5xl">{selectedSpell.icon}</span> Casting{" "}
            {selectedSpell.name}
          </h3>
          <p className="text-sm italic text-purple-300">{selectedSpell.description}</p>
        </div>
      )}
    </div>
  );
};

export default SpellBook;
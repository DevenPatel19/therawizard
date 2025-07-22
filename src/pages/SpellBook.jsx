import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import spellsData from "../data/spells.json";
import MagicalParticles from "../components/ui/MagicalParticles";

export default function SpellBook() {
  const [spells, setSpells] = useState([]);
  const [castingSpell, setCastingSpell] = useState(null);
  const [flySpell, setFlySpell] = useState(null);

  useEffect(() => {
    setSpells(spellsData);
  }, []);

  const navigate = useNavigate();

  const handleCast = (spell, event) => {
    setCastingSpell(spell.name);
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setFlySpell({ name: spell.name, position });

    setTimeout(() => {
      setCastingSpell(null);
      setFlySpell(null);
    }, 1500);
  };

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
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-center mb-10 font-serif drop-shadow-lg">
          📖 Spellbook
        </h1>
        <div className="text-center mb-6">
          <button className="btn btn-accent" onClick={() => navigate("/spells/new")}>
            Record a new Spell
          </button>
          <button className="btn btn-accent m-4" onClick={() => navigate("/journals/new")}>
            Spell Notes
          </button>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spells.map((spell) => (
            <div
              key={spell.id}  // use id here
              onClick={(e) => handleCast(spell, e)}
              className={clsx(
                "cursor-pointer rounded-xl border border-violet-500 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105",
                castingSpell === spell.name && "bright-pulse border-4 border-yellow-400 scale-110",
                "bg-black bg-opacity-20 backdrop-blur-md"
              )}
              style={{ backgroundColor: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)" }}
              title={`Cast ${spell.name}`}
            >
              <div className="p-6 space-y-3 text-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">
                    {spell.icon} {spell.name}
                  </h2>
                  <span className="badge badge-info text-sm px-2">
                    Effort: {spell.effort}
                  </span>
                </div>
                <p className="text-sm italic">{spell.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {spell.tags.map((tag) => (
                    <span key={tag} className="badge badge-accent badge-outline text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Add Edit button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent casting when clicking edit
                    navigate(`/spells/edit/${spell.id}`);
                  }}
                  className="mt-3 btn btn-sm btn-outline btn-warning w-full"
                >
                  Edit Spell
                </button>

                {castingSpell === spell.name && (
                  <div className="mt-2 text-center text-yellow-300 font-bold animate-fade-in">
                    ✨ Spell Cast! ✨
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

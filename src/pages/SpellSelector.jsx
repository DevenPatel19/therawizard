import React from "react";

const spells = [
  {
    name: "Fireball",
    description: "Explodes on impact.",
    color: "red",
    icon: "🔥",
  },
  {
    name: "Frost Nova",
    description: "Freezes enemies in a radius.",
    color: "skyblue",
    icon: "❄️",
  },
  {
    name: "Arcane Blast",
    description: "Pure energy blast.",
    color: "violet",
    icon: "💥",
  },
  {
    name: "Healing Light",
    description: "Restores health over time.",
    color: "gold",
    icon: "✨",
  },
];

const SpellSelector = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 max-w-xl mx-auto">
      {spells.map((spell, index) => (
        <button
          key={index}
          onClick={() => onSelect(spell)}
          className="bg-zinc-900 hover:bg-zinc-800 border border-yellow-500 rounded-xl p-4 transition text-left shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{spell.icon}</span>
            <div>
              <h3 className="text-lg font-bold" style={{ color: spell.color }}>
                {spell.name}
              </h3>
              <p className="text-sm text-gray-300">{spell.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SpellSelector;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const allTags = [
  "Angry 🔥",
  "Disgusted 🤢",
  "Sad 💧",
  "Happy ☀️",
  "Surprised ❄️",
  "Bad 💀",
  "Fearful 😱",
];

const efforts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function SpellForm({ initialData = {}, onSave }) {
  const navigate = useNavigate();

  const [spell, setSpell] = useState({
    name: "",
    description: "",
    icon: "",
    effort: efforts[0],
    tags: [],
    id: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpell((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag) => {
    setSpell((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!spell.name.trim()) {
      alert("Spell name is required!");
      return;
    }
    onSave(spell);
    navigate("/spellbook");
  };

  const handleCancel = () => navigate("/spellbook");

  return (
    <div
      className="rounded-3xl border-2 border-purple-600 bg-black bg-opacity-30 backdrop-blur-md p-8 shadow-xl text-white max-w-lg w-full"
      style={{ backgroundColor: "rgba(10, 10, 30, 0.4)" }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-white flex items-center gap-2 drop-shadow-lg">
        {spell.icon && <span className="text-4xl">{spell.icon}</span>}{" "}
        {spell.name || "New Spell"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Spell ID (read-only) */}
        {spell.id && (
          <div>
            <label className="block text-white font-semibold mb-1">Spell ID</label>
            <input
              type="text"
              name="id"
              value={spell.id}
              readOnly
              className="bg-black bg-opacity-50 text-white input input-bordered input-accent w-full cursor-not-allowed"
            />
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-white font-semibold mb-1">Spell Name</label>
          <input
            type="text"
            name="name"
            value={spell.name}
            onChange={handleChange}
            placeholder="Enter spell name"
            className="bg-black bg-opacity-50 text-white placeholder-gray-400 input input-bordered input-accent w-full focus:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:drop-shadow-[0_0_8px_rgba(147,71,255,0.9)] transition"
            required
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block text-white font-semibold mb-1">Icon (Emoji)</label>
          <input
            type="text"
            name="icon"
            value={spell.icon}
            onChange={handleChange}
            placeholder="e.g. 🧙🪄"
            maxLength={2}
            className="bg-black bg-opacity-50 text-white placeholder-gray-400 input input-bordered input-accent w-full focus:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:drop-shadow-[0_0_8px_rgba(147,71,255,0.9)] transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={spell.description}
            onChange={handleChange}
            placeholder="Describe the spell"
            rows={6}
            className="bg-black bg-opacity-50 text-white placeholder-gray-400 textarea textarea-bordered textarea-accent w-full min-h-20 resize-y focus:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:drop-shadow-[0_0_8px_rgba(147,71,255,0.9)] transition"
            required
          />
        </div>

        {/* Effort dropdown */}
        <div>
          <label className="block text-white font-semibold mb-1">Effort</label>
          <select
            name="effort"
            value={spell.effort}
            onChange={handleChange}
            className="bg-black bg-opacity-50 text-white select select-bordered select-accent w-full focus:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:drop-shadow-[0_0_8px_rgba(147,71,255,0.9)] transition"
          >
            {efforts.map((e) => (
              <option key={e} value={e} className="bg-black text-white">
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* Tags multi-select */}
        <div>
          <label className="block text-white font-semibold mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={spell.tags.includes(tag)}
                className={`badge cursor-pointer transition-all duration-200 ${
  spell.tags.includes(tag) ? "badge-warning" : "badge-info badge-outline"
}`}
                style={{ transition: "box-shadow 0.3s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 8px 2px rgba(147, 112, 219, 0.8)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="btn btn-ghost text-white border border-purple-600 hover:border-yellow-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-lg text-white border border-purple-600 hover:border-yellow-400 bright-pulse"
          >
            Save Spell
          </button>
        </div>
      </form>
    </div>
  );
}

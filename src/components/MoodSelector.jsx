// src/components/MoodSelector.jsx
import React, { useState, useEffect } from "react";

const moods = [
  { id: "happy", emoji: "😊", label: "Happy", color: "yellow-400" },
  { id: "sad", emoji: "😢", label: "Sad", color: "blue-400" },
  { id: "angry", emoji: "😠", label: "Angry", color: "red-500" },
  { id: "calm", emoji: "😌", label: "Calm", color: "green-400" },
  { id: "confused", emoji: "😕", label: "Confused", color: "gray-400" },
  { id: "excited", emoji: "🤩", label: "Excited", color: "pink-400" },
];

const MoodSelector = ({
  selectedMood,
  onChange,
  label,
  customMood,
  onCustomMoodChange,
  maxCustomLength = 20,
}) => {
  const [customActive, setCustomActive] = useState(false);

  useEffect(() => {
    if (customMood && customMood.trim() !== "") {
      setCustomActive(true);
    } else {
      setCustomActive(false);
    }
  }, [customMood]);

  const handleMoodClick = (moodId) => {
    onChange(moodId);
    onCustomMoodChange(""); // Clear custom mood when selecting preset
  };

  return (
    <div className="mb-4">
      <label className="font-medium mb-1 block">{label}</label>

      <div className="flex flex-wrap gap-3 mb-2">
        {moods.map(({ id, emoji, label, color }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleMoodClick(id)}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors
              ${
                !customActive && selectedMood === id
                  ? `border-${color} bg-${color} bg-opacity-30`
                  : "border-transparent hover:border-slate-400"
              }`}
            aria-label={label}
          >
            <span className="text-2xl">{emoji}</span>
          </button>
        ))}
      </div>

      <div>
        <label
          htmlFor={`${label}-custom`}
          className="block text-sm font-semibold mb-1"
        >
          Or enter a custom mood (max {maxCustomLength} chars):
        </label>
        <input
          id={`${label}-custom`}
          type="text"
          value={customMood}
          onChange={(e) =>
            e.target.value.length <= maxCustomLength &&
            onCustomMoodChange(e.target.value)
          }
          placeholder="Type custom mood"
          className="input input-bordered w-full"
          maxLength={maxCustomLength}
        />
      </div>
    </div>
  );
};

export default MoodSelector;

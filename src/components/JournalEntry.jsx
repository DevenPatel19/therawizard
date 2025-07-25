// src/components/JournalEntry.jsx
import React, { useEffect, useState } from "react";
import MoodSelector from "./Moodselector.jsx";

const JournalEntry = ({ spell, onSave }) => {
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
  const [customMoodBefore, setCustomMoodBefore] = useState("");
  const [customMoodAfter, setCustomMoodAfter] = useState("");
  const [notes, setNotes] = useState("");
  const [usedSpell, setUsedSpell] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (spell) {
      setUsedSpell(spell.name);
    }
    setTimestamp(new Date().toISOString());
  }, [spell]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalMoodBefore = customMoodBefore.trim() || moodBefore;
    const finalMoodAfter = customMoodAfter.trim() || moodAfter;

    onSave({
      id: Date.now(),
      moodBefore: finalMoodBefore,
      moodAfter: finalMoodAfter,
      notes,
      timestamp: new Date().toISOString(),
      usedSpell,
    });

    setMoodBefore("");
    setMoodAfter("");
    setCustomMoodBefore("");
    setCustomMoodAfter("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <MoodSelector
        label="Mood Before"
        selectedMood={moodBefore}
        onChange={setMoodBefore}
        customMood={customMoodBefore}
        onCustomMoodChange={setCustomMoodBefore}
        maxCustomLength={20}
      />

      <MoodSelector
        label="Mood After"
        selectedMood={moodAfter}
        onChange={setMoodAfter}
        customMood={customMoodAfter}
        onCustomMoodChange={setCustomMoodAfter}
        maxCustomLength={20}
      />

      <div>
        <label className="font-medium">Notes:</label>
        <textarea
          className="textarea textarea-bordered w-full"
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">Spell Used:</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={usedSpell}
          readOnly
        />
      </div>

      <div>
        <label className="font-medium">Date & Time:</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={new Date(timestamp).toLocaleString()}
          readOnly
        />
      </div>

      <button
        type="submit"
        className="btn btn-success w-full"
        disabled={
          !(
            (customMoodBefore.trim() || moodBefore) &&
            (customMoodAfter.trim() || moodAfter)
          )
        }
      >
        Save Entry
      </button>
    </form>
  );
};

export default JournalEntry;

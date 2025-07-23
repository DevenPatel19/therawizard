// src/components/JournalEntry.jsx
import React, { useEffect, useState } from "react";

const moods = ["😊 Happy", "😔 Sad", "😡 Angry", "😌 Calm", "😕 Confused", "🤩 Excited"];

const JournalEntry = ({ spell, onSave }) => {
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
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
    onSave({
      id: Date.now(),
      moodBefore,
      moodAfter,
      notes,
      usedSpell,
      timestamp,
    });
    // Reset form (optional)
    setMoodBefore("");
    setMoodAfter("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-medium">Mood Before:</label>
        <select
          className="select select-bordered w-full"
          value={moodBefore}
          onChange={(e) => setMoodBefore(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {moods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-medium">Mood After:</label>
        <select
          className="select select-bordered w-full"
          value={moodAfter}
          onChange={(e) => setMoodAfter(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {moods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

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

      <button type="submit" className="btn btn-success w-full">
        Save Entry
      </button>
    </form>
  );
};

export default JournalEntry;

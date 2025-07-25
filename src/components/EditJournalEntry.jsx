// src/components/EditJournalEntry.jsx
import React, { useState } from "react";
import MoodSelector from "./Moodselector.jsx";

export default function EditJournalEntry({ entry, onUpdate, onCancel }) {
  // State now tracks both preset mood ID and custom mood text for before/after
  // Initialize with entry.moodBefore/moodAfter - they might be preset IDs or custom strings
  const isPresetMood = (mood) => ["happy", "sad", "angry", "calm", "confused", "excited"].includes(mood);

  // For moodBefore
  const [moodBeforePreset, setMoodBeforePreset] = useState(
    isPresetMood(entry.moodBefore) ? entry.moodBefore : ""
  );
  const [moodBeforeCustom, setMoodBeforeCustom] = useState(
    isPresetMood(entry.moodBefore) ? "" : entry.moodBefore || ""
  );

  // For moodAfter
  const [moodAfterPreset, setMoodAfterPreset] = useState(
    isPresetMood(entry.moodAfter) ? entry.moodAfter : ""
  );
  const [moodAfterCustom, setMoodAfterCustom] = useState(
    isPresetMood(entry.moodAfter) ? "" : entry.moodAfter || ""
  );

  const [notes, setNotes] = useState(entry.notes);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Compose final moods: custom overrides preset if custom is non-empty
    const moodBefore = moodBeforeCustom.trim() !== "" ? moodBeforeCustom.trim() : moodBeforePreset;
    const moodAfter = moodAfterCustom.trim() !== "" ? moodAfterCustom.trim() : moodAfterPreset;

    onUpdate({
      ...entry,
      notes,
      moodBefore,
      moodAfter,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onCancel} // click outside closes modal
    >
      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // prevent modal close on inside click
      >
        <h3 className="font-bold text-lg mb-4">Edit Journal Entry</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Spell Used</label>
            <input
              type="text"
              value={entry.spell?.name || entry.usedSpell || ""}
              disabled
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Date</label>
            <input
              type="text"
              value={new Date(entry.timestamp || entry.date).toLocaleString()}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          {/* Mood Before */}
          <MoodSelector
            label="Mood Before"
            selectedMood={moodBeforePreset}
            onChange={(val) => {
              setMoodBeforePreset(val);
              setMoodBeforeCustom(""); // clear custom when preset selected
            }}
            customMood={moodBeforeCustom}
            onCustomMoodChange={setMoodBeforeCustom}
          />

          {/* Mood After */}
          <MoodSelector
            label="Mood After"
            selectedMood={moodAfterPreset}
            onChange={(val) => {
              setMoodAfterPreset(val);
              setMoodAfterCustom("");
            }}
            customMood={moodAfterCustom}
            onCustomMoodChange={setMoodAfterCustom}
          />

          <div>
            <label className="block font-semibold">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline btn-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

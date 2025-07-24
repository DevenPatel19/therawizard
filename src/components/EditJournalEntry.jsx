import React, { useState } from "react";

export default function EditJournalEntry({ entry, onUpdate, onCancel }) {
  const [notes, setNotes] = useState(entry.notes);
  const [moodBefore, setMoodBefore] = useState(entry.moodBefore);
  const [moodAfter, setMoodAfter] = useState(entry.moodAfter);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...entry,
      notes,
      moodBefore,
      moodAfter,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
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
          <div>
            <label className="block font-semibold">Mood Before</label>
            <input
              type="text"
              value={moodBefore}
              onChange={(e) => setMoodBefore(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Mood After</label>
            <input
              type="text"
              value={moodAfter}
              onChange={(e) => setMoodAfter(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
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

import React, { useState } from "react";
import EditJournalEntry from "../components/EditJournalEntry";

export default function JournalIndex({ journalEntries = [], onUpdateEntry }) {
  const [editingEntry, setEditingEntry] = useState(null);

  const handleUpdateClick = (entry) => {
    setEditingEntry(entry);
  };

  const handleUpdate = (updatedEntry) => {
    onUpdateEntry(updatedEntry);
    setEditingEntry(null);
  };

  const handleCancel = () => {
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">📝 Spell Notes</h1>
      {journalEntries.length === 0 ? (
        <p>No journal entries found.</p>
      ) : (
        <ul className="space-y-4">
          {journalEntries.map((entry, idx) => (
            <li
              key={idx}
              className="bg-gray-800 p-4 rounded-md shadow-md"
            >
              <h2 className="text-xl font-semibold">{entry.spell?.name ?? "Unknown Spell"}</h2>
              <p><strong>Date:</strong> {new Date(entry.date).toLocaleString()}</p>
              <p><strong>Notes:</strong> {entry.notes}</p>
              <p><strong>Mood Before:</strong> {entry.moodBefore}</p>
              <p><strong>Mood After:</strong> {entry.moodAfter}</p>
              <button
                className="btn btn-sm btn-info btn-ghost mt-2"
                onClick={() => handleUpdateClick(entry)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}

      {editingEntry && (
        <EditJournalEntry
          entry={editingEntry}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

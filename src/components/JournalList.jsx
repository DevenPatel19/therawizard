// src/components/JournalList.jsx
import React, { useState } from "react";
import EditJournalEntry from "./EditJournalEntry"; // adjust path if needed

const getMoodIcon = (mood) => {
  switch (mood) {
    case "excited":
      return "😄";
    case "happy":
      return "😊";
    case "calm":
      return "😌";
    case "confused":
      return "😕";
    case "sad":
      return "😢";
    case "angry":
      return "😠";
    default:
      return "❓";
  }
};

const JournalList = ({ entries, onUpdateEntry }) => {
  const [editingEntry, setEditingEntry] = useState(null);

  const handleUpdateClick = (entry) => {
    setEditingEntry(entry);
  };

  const handleSave = (updatedEntry) => {
    onUpdateEntry(updatedEntry);
    setEditingEntry(null);
  };

  const handleCancel = () => {
    setEditingEntry(null);
  };

  if (!entries.length) {
    return <p>No journal entries yet.</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-gray-100 rounded p-4 border border-gray-300"
          >
            <h3 className="font-semibold text-lg">{entry.usedSpell}</h3>
            <p className="text-sm text-gray-600">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
            <p className="mt-2">{entry.notes}</p>
            <p className="mt-2 text-sm text-gray-700">
              Mood Before: {getMoodIcon(entry.moodBefore)} {entry.moodBefore}
            </p>
            <p className="text-sm text-gray-700">
              Mood After: {getMoodIcon(entry.moodAfter)} {entry.moodAfter}
            </p>
            <button
              className="mt-3 px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700"
              onClick={() => handleUpdateClick(entry)}
            >
              Update Note
            </button>
          </div>
        ))}
      </div>

      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <EditJournalEntry
              entry={editingEntry}
              onUpdate={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default JournalList;

import React, { useState, useEffect } from "react";
import MagicalParticles from "../components/ui/MagicalParticles";
import EditJournalEntry from "../components/EditJournalEntry"; // Assuming you have this form component

// Mood icon map
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

const JournalIndex = () => {
  const [filterMood, setFilterMood] = useState("all");
  const [journalEntries, setJournalEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null); // Track current entry being edited

  useEffect(() => {
    fetch("/journalEntries.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch journal entries");
        return res.json();
      })
      .then((data) => setJournalEntries(data))
      .catch(() => setJournalEntries([]));
  }, []);

  // Filter & sort
  const filteredEntries = journalEntries.filter((entry) => {
    if (filterMood === "all") return true;
    const mood = entry?.moodAfter?.toLowerCase();
    return mood === filterMood;
  });

  const sortedEntries = filteredEntries.slice().sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  // Handler for saving updated entry
  const handleUpdateEntry = (updatedEntry) => {
    setJournalEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    setEditingEntry(null);
  };

  // Handler for deleting entry
  const handleDeleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setJournalEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white p-6 relative">
      <MagicalParticles />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Journal Entries</h1>
        </div>

        {/* Mood Filter */}
        <div className="mb-4 space-x-2 overflow-x-auto whitespace-nowrap">
          {["all", "excited", "happy", "calm", "confused", "sad", "angry"].map(
            (mood) => (
              <button
                key={mood}
                onClick={() => setFilterMood(mood)}
                className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                  filterMood === mood
                    ? "bg-violet-600 text-white border-violet-500"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-600 hover:border-slate-500"
                }`}
              >
                {mood === "all"
                  ? "All"
                  : `${getMoodIcon(mood)} ${mood.charAt(0).toUpperCase() + mood.slice(1)}`}
              </button>
            )
          )}
        </div>

        {/* Journal Entries */}
        {sortedEntries.length === 0 ? (
          <p className="text-slate-400">No journal entries found.</p>
        ) : (
          <div className="space-y-4">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-violet-300">
                    {entry.usedSpell || entry.spell || "Unknown Spell"}
                  </h2>
                  <span className="text-sm text-slate-400">
                    {entry.timestamp && !isNaN(new Date(entry.timestamp).getTime())
                      ? new Date(entry.timestamp).toLocaleDateString()
                      : "Unknown Date"}
                  </span>
                </div>
                <p className="text-slate-300 mt-1">{entry.notes}</p>
                <div className="mt-2 text-sm text-slate-400 flex justify-between items-center">
                  <div>
                    <span className="mr-2">
                      Mood Before: {getMoodIcon(entry.moodBefore)}{" "}
                      {entry.moodBefore?.charAt(0).toUpperCase() + entry.moodBefore?.slice(1)}
                    </span>
                    <span>
                      Mood After: {getMoodIcon(entry.moodAfter)}{" "}
                      {entry.moodAfter?.charAt(0).toUpperCase() + entry.moodAfter?.slice(1)}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingEntry(entry)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-slate-900 p-6 rounded-lg w-full max-w-lg">
              <h3 className="text-xl font-bold mb-4 text-white">Edit Journal Entry</h3>
              <EditJournalEntry
                entry={editingEntry}
                onSave={handleUpdateEntry}
                onCancel={() => setEditingEntry(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalIndex;

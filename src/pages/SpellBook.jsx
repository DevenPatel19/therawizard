// src/pages/SpellBook.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import spellsData from "../data/spells.json";
import MagicalParticles from "../components/ui/MagicalParticles";
import JournalEntry from "../components/JournalEntry";

const MODAL_FADE_DURATION_MS = 300;

export default function SpellBook({ onJournalSave }) {
  const [spells, setSpells] = useState([]);
  const [castingSpell, setCastingSpell] = useState(null);
  const [flySpell, setFlySpell] = useState(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [journalSpell, setJournalSpell] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSpells(spellsData);
  }, []);

  const openModal = (spell) => {
    setJournalSpell(spell);
    setShowJournalModal(true);
    // Delay modal visible state for fade-in effect
    setTimeout(() => setModalVisible(true), 20);
  };

  const closeModal = () => {
    // Start fade out
    setModalVisible(false);
    // After fade out duration, hide modal completely
    setTimeout(() => setShowJournalModal(false), MODAL_FADE_DURATION_MS);
  };

  const handleCast = (spell, event) => {
    setCastingSpell(spell.name);
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setFlySpell({ name: spell.name, position });

    // Wait for casting animation to finish before showing modal
    setTimeout(() => openModal(spell), 1500);

    setTimeout(() => {
      setCastingSpell(null);
      setFlySpell(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black -z-20" />
      <MagicalParticles
        flySpell={flySpell}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-center mb-10 font-serif drop-shadow-lg">
          📖 Spellbook
        </h1>
        <div className="text-center mb-6">
          <button
            className="btn btn-info"
            onClick={() => navigate("/spells/new")}
          >
            Record a new Spell
          </button>
          <button
            className="btn btn-accent m-4"
            onClick={() => navigate("/journals")}
          >
            Spell Notes
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spells.map((spell) => (
            <div
              key={spell.id}
              onClick={(e) => handleCast(spell, e)}
              className={clsx(
                "cursor-pointer rounded-xl border border-violet-500 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105",
                castingSpell === spell.name &&
                  "bright-pulse border-4 border-yellow-400 scale-110",
                "bg-black bg-opacity-20 backdrop-blur-md"
              )}
              title={`Cast ${spell.name}`}
            >
              <div className="p-6 space-y-3 text-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">
                    {spell.icon} {spell.name}
                  </h2>
                  <span className="badge badge-info text-sm px-2">
                    Effort: {spell.effort}
                  </span>
                </div>
                <p className="text-sm italic">{spell.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {spell.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-accent badge-outline text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/spells/edit/${spell.id}`);
                  }}
                  className="mt-3 btn btn-sm btn-outline btn-warning w-full"
                >
                  Edit Spell
                </button>

                {castingSpell === spell.name && (
                  <div className="mt-2 text-center text-yellow-300 font-bold animate-fade-in">
                    ✨ Spell Cast! ✨
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journal Entry Modal */}
      {showJournalModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
          style={{
            opacity: modalVisible ? 1 : 0,
            pointerEvents: modalVisible ? "auto" : "none",
          }}
          onClick={closeModal}
        >
          <div
            className="modal-box w-11/12 max-w-2xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
            style={{
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${MODAL_FADE_DURATION_MS}ms ease, transform ${MODAL_FADE_DURATION_MS}ms ease`,
            }}
          >
            <h3 className="font-bold text-lg mb-4">Log Your Spell Experience 📝</h3>
            <JournalEntry
              spell={journalSpell}
              onSave={(entry) => {
                const entryWithSpell = {
                  ...entry,
                  spell: journalSpell,
                  timestamp: new Date().toISOString(),
                };
                onJournalSave(entryWithSpell); // notify parent
                console.log("Journal saved:", entryWithSpell);
                closeModal();
              }}
            />
            <div className="modal-action mt-4 flex justify-end">
              <button className="btn btn-error" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

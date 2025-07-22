import React from "react";
import { useParams } from "react-router-dom";
import SpellForm from "../../components/SpellForm.jsx";
import SpellFormLayout from "../../components/layouts/SpellFormLayout.jsx";

export default function EditSpell({ spells, updateSpell }) {
  const { id } = useParams();
  const spellId = Number(id);

  const spellToEdit = spells.find((spell) => spell.id === spellId);

  if (!spellToEdit) {
    return <p className="text-white p-8">Spell not found</p>;
  }

  const handleSave = (updatedSpell) => {
    updateSpell(updatedSpell);
  };

  return (
    <SpellFormLayout flySpell={null}>
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-serif mb-6 text-white">
          Edit Spell: {spellToEdit.name}
        </h1>
        <SpellForm initialData={spellToEdit} onSave={handleSave} />
      </div>
    </SpellFormLayout>
  );
}

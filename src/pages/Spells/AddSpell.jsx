import SpellForm from "../../components/SpellForm.jsx";
import SpellFormLayout from "../../components/layouts/SpellFormLayout.jsx";

export default function AddSpell({ addSpell }) {
  const handleSave = (newSpell) => {
    addSpell(newSpell);
  };

  return (
    <SpellFormLayout flySpell={null}>
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-serif mb-6 text-white">Record a New Spell</h1>
        <SpellForm onSave={handleSave} />
      </div>
    </SpellFormLayout>
  );
}

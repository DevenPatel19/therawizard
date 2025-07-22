import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Splash from "./pages/Splash.jsx";
import SpellBook from "./pages/SpellBook.jsx";
import AddSpell from "./pages/Spells/AddSpell.jsx";
import EditSpell from "./pages/Spells/EditSpell.jsx";

import initialSpells from "./data/spells.json";

export default function App() {
  const [spells, setSpells] = useState(initialSpells);
  const navigate = useNavigate();

  const addSpell = (newSpell) => {
    setSpells((prevSpells) => [...prevSpells, newSpell]);
    navigate("/spellbook");
  };

  const updateSpell = (updatedSpell) => {
    setSpells((prevSpells) =>
      prevSpells.map((spell) =>
        spell.id === updatedSpell.id ? updatedSpell : spell
      )
    );
    navigate("/spellbook");
  };

  return (
    <>
      <h1>
        Welcome to <a href="/" className="font-bold">Spellweaver</a>
      </h1>
      <Routes>
        <Route path="*" element={<p>Page not found</p>} />

        <Route path="/" element={<Splash />} />
        <Route path="/spellbook" element={<SpellBook spells={spells} />} />
        <Route path="/spells/new" element={<AddSpell addSpell={addSpell} />} />

        <Route
          path="/spells/edit/:id"
          element={<EditSpell spells={spells} updateSpell={updateSpell} />}
        />
      </Routes>
    </>
  );
}

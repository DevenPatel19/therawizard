import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash.jsx";
import SpellBook from "./pages/SpellBook.jsx";
import spells from"./data/spells.json"; 

export default function App() {
  return (
    <>
      <h1> Welcome to Spellweaver</h1>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/spellbook" element={<SpellBook spells={spells}/>} />
      </Routes>
    </>
  );
}

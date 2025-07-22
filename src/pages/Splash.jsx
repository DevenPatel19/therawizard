import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import MagicParticles from "../components/ui/MagicalParticles.jsx";

export default function Splash() {
  const navigate = useNavigate();

  const openSpellBook = () => {
    navigate("/spellbook");
  };

  const loginGoogle = () => {
    // Placeholder for Google login logic 
    console.log("Google login clicked");
  }

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Magical Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MagicParticles />
      </div>

      {/* Foreground Content */}
      <div className="z-10">
        <motion.h1
          className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Therapy is Magic
        </motion.h1>

        <motion.p
          className="text-lg text-indigo-200 max-w-md mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A magical journaling app for kids and patients to practice coping skills.
        </motion.p>

        <motion.button
          className="btn btn-primary btn-lg btn-wide"
          onClick={openSpellBook}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Open Spellbook
        </motion.button>
        <motion.button
          className="btn btn-outline btn-lg btn-wide mt-4"
          onClick={loginGoogle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
           <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
        </motion.button>
      
      </div>
    </motion.div>
  );
}

import { useNavigate } from "react-router-dom";

 const effortColors = {
    low: "bg-green-500",
    moderate: "bg-yellow-500",
    high: "bg-red-500",
  };

  // function getEffortColor(effort) {
  //   const numEffort = Number(effort);
  //   if (numEffort >= 8) return effortColors.high;
  //   if (numEffort >= 4) return effortColors.moderate;
  //   return effortColors.low;};


const SpellCard = ({ spell, onCast }) => {  
  const navigate = useNavigate();
  // const effortClass = getEffortColor(spell.effort);

 
  const handleEditClick = (e) => {
    e.stopPropagation(); // prevent triggering onCast
    navigate(`/edit-spell/${spell.id}`);
  };

  return (
    <div
      onClick={() => onCast(spell)}
      className="cursor-pointer bg-indigo-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-purple-600
                 hover:shadow-[0_0_20px_5px_rgba(147,71,255,0.7)] hover:border-purple-400 transition duration-500 ease-in-out
                 flex flex-col items-center text-white select-none
                 filter saturate-150"
      title={`Cast ${spell.name}`}
    >
      <div
        className="text-7xl mb-4 animate-pulse"
        style={{ textShadow: "0 0 15px rgba(147,71,255,0.8)" }}
      >
        {spell.icon}
      </div>
      <h2
        className="text-2xl font-extrabold mb-2 font-serif tracking-wide"
        style={{ textShadow: "0 0 8px rgba(255,255,255,0.9)" }}
      >
        {spell.name}
      </h2>
      <p className="text-sm mb-4 text-purple-300 text-center italic drop-shadow-md">
        {spell.description}
      </p>
      <div className="flex justify-center space-x-3 mb-4 flex-wrap">
        <span
          className={`text-white px-3 py-1 rounded-full font-semibold shadow-md ${effortColors[spell.effort]}`}
        >
           Effort: {spell.effort}
        </span>
        {spell.tags.map((tag) => (
          <span
            key={tag}
            className="bg-purple-700 bg-opacity-50 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Edit button */}
      <button
        onClick={handleEditClick}
        className="btn btn-sm btn-outline btn-secondary text-white border-purple-400 hover:border-yellow-400 transition"
      >
        Edit
      </button>
    </div>
  );
};

export default SpellCard;

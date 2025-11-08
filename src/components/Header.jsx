import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Header({ title, showBackButton = true }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="bg-[#1E2A38] text-white h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between shadow flex-shrink-0">

      {/* LEFT: Title */}
      <h1 className="text-lg sm:text-2xl font-normal text-yellow-500 truncate">
        {title}
      </h1>

      {/* RIGHT: Back button */}
      {showBackButton && (
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title="Go back"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}
    </header>
  );
}

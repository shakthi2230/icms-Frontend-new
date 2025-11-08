import React from "react";
import bgImage from "../assets/industry.jpg";

function Home() {
  return (
    <div
      className="relative w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-700/60"></div>

      {/* Main content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* Welcome text block */}
        <div className="text-right">
          <h1 className="text-yellow-500 font-bold text-sm sm:text-base lg:text-lg">
            Welcome to
          </h1>

          <h2 className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
            ICOMS
          </h2>
        </div>

      </div>
    </div>
  );
}

export default Home;

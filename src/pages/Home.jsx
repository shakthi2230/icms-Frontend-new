import React from "react";
import bgImage from "../assets/industry.jpg";

function Home() {
  return (
    <div
      className="relative w-full h-full overflow-hidden bg-fixed"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to reduce image opacity */}
      <div className="absolute inset-0 bg-gray-700 opacity-50"></div>

      {/* Step-based welcome text */}
      <div className="absolute top-5 right-5 z-10 text-right">
        <h1 className="text-yellow-500 text-2xl md:text-3xl font-bold">
          Welcome to&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </h1>

        <h2 className="text-white text-4xl md:text-3xl font-bold mt-1 ml-8">
          ICMS
        </h2>
      </div>
    </div>
  );
}

export default Home;

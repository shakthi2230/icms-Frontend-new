import React, { useState } from "react";

const EngineeringImport = () => {
  const categories = [
    "Cables",
    "Circuits & Starters",
    "Dummy Tags",
    "Electrical Equipment",
    "Fire and Gas",
    "Function Block",
    "Heat Trace Cables",
    "HVAC",
    "Instruments",
    "Junction Boxes",
    "Lines",
    "Loops",
    "Master Equipment",
    "Piping Special Items",
    "Safety",
    "Signals",
    "Telecom",
    "TestPacks",
    "ValidationError",
    "Valves",
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    configName: "",
    description: "",
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", {
      engRegister: selectedCategory,
      ...formData,
    });
    setShowForm(false);
    setFormData({ configName: "", description: "" });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
  
      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-300 p-3">
          <div className="flex space-x-2 mb-3">
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 text-sm">
              New Import
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 text-sm">
              New Version
            </button>
          </div>

          <ul className="text-sm text-gray-700">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`cursor-pointer px-2 py-1 rounded hover:bg-blue-100 ${
                  selectedCategory === cat ? "bg-blue-50 font-medium" : ""
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex  justify-center relative">
          {!showForm && (
            <p className="text-gray-500 text-sm">
              Select a config or version in the tree to the left
            </p>
          )}

          {/* Popup Form */}
          {showForm && (
            <div className="absolute bg-white shadow-lg border border-gray-300 rounded-md w-96 p-4">
              <h3 className="text-sm font-semibold mb-3">New Import</h3>

              <div className="mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Eng Register *
                </label>
                <input
                  type="text"
                  value={selectedCategory}
                  readOnly
                  className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Config Name *
                </label>
                <input
                  type="text"
                  name="configName"
                  value={formData.configName}
                  onChange={handleChange}
                  placeholder="Enter Config Name"
                  className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-3">
                <label className="text-xs font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows="4"
                  className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngineeringImport;

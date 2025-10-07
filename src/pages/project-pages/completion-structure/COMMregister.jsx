import React from "react";

const data = [
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-001",
    description: "MRP - Low Pres. High Purity N2 Distribution",
    system: "16",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-002",
    description: "RP - Lean MEG System",
    system: "34",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-003",
    description: "Cooling Water Circulation System",
    system: "22",
    handoverType: "B",
    plant: "PWP",
    responsible: "JKT",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-004",
    description: "Steam Generation Unit",
    system: "18",
    handoverType: "A",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-005",
    description: "Firewater Distribution Network",
    system: "45",
    handoverType: "C",
    plant: "PWP",
    responsible: "HST",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-006",
    description: "Compressed Air System",
    system: "27",
    handoverType: "B",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-007",
    description: "HVAC System for Control Room",
    system: "31",
    handoverType: "C",
    plant: "PWP",
    responsible: "JKT",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-008",
    description: "Wastewater Treatment Unit",
    system: "39",
    handoverType: "A",
    plant: "PWP",
    responsible: "HST",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-009",
    description: "Fuel Gas Supply System",
    system: "14",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-010",
    description: "Process Water Treatment",
    system: "25",
    handoverType: "B",
    plant: "PWP",
    responsible: "JKT",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-011",
    description: "Instrument Air System",
    system: "29",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-012",
    description: "Flare System",
    system: "41",
    handoverType: "A",
    plant: "PWP",
    responsible: "HST",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-013",
    description: "Chemical Injection System",
    system: "33",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-014",
    description: "Hot Oil System",
    system: "19",
    handoverType: "B",
    plant: "PWP",
    responsible: "JKT",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-015",
    description: "Cooling Tower System",
    system: "23",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-016",
    description: "LPG Storage and Distribution",
    system: "47",
    handoverType: "A",
    plant: "PWP",
    responsible: "HST",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-017",
    description: "Emergency Power Generation",
    system: "12",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-018",
    description: "Seawater Intake System",
    system: "36",
    handoverType: "B",
    plant: "PWP",
    responsible: "JKT",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-019",
    description: "Nitrogen Generation Unit",
    system: "17",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-020",
    description: "Glycol Regeneration System",
    system: "35",
    handoverType: "A",
    plant: "PWP",
    responsible: "HST",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-021",
    description: "Potable Water System",
    system: "28",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-022",
    description: "Ventilation System for Process Area",
    system: "30",
    handoverType: "B",
    plant: "PWP",
    responsible: "JKT",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-023",
    description: "Condensate Recovery System",
    system: "21",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-024",
    description: "Oily Water Treatment",
    system: "38",
    handoverType: "A",
    plant: "PWP",
    responsible: "HST",
  },
  {
    projectId: "PVALHALA-22",
    subsystem: "28005-MCAG7-01-025",
    description: "Main Power Distribution",
    system: "11",
    handoverType: "C",
    plant: "PWP",
    responsible: "NYM",
  },
];
export default function SubsystemTable() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Subsystems</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
            Show All
          </button>
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100">
            Common Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700 border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium border border-gray-300">Project Id</th>
              <th className="px-4 py-2 font-medium border border-gray-300">Subsystem</th>
              <th className="px-4 py-2 font-medium border border-gray-300">Description</th>
              <th className="px-4 py-2 font-medium border border-gray-300">System</th>
              <th className="px-4 py-2 font-medium border border-gray-300">Handover Type</th>
              <th className="px-4 py-2 font-medium border border-gray-300">Plant</th>
              <th className="px-4 py-2 font-medium border border-gray-300">Responsible</th>
            </tr>

            {/* Filter Row */}
            <tr className="bg-white">
              {Array(7)
                .fill()
                .map((_, i) => (
                  <th key={i} className="px-4 py-2 border border-gray-300">
                    <input
                      type="text"
                      placeholder="Filter"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400"
                    />
                  </th>
                ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <td className="px-4 py-2 border border-gray-300">{row.projectId}</td>
                <td className="px-4 py-2 border border-gray-300 text-blue-600 font-medium">
                  {row.subsystem}
                </td>
                <td className="px-4 py-2 border border-gray-300">{row.description}</td>
                <td className="px-4 py-2 border border-gray-300">{row.system}</td>
                <td className="px-4 py-2 border border-gray-300">{row.handoverType}</td>
                <td className="px-4 py-2 border border-gray-300">{row.plant}</td>
                <td className="px-4 py-2 border border-gray-300">{row.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
        <div>Showing 1–25 of 1,294</div>
        <div className="flex items-center space-x-1">
          <button className="px-2 py-1 border rounded hover:bg-gray-100">◀</button>
          <button className="px-2 py-1 border rounded hover:bg-gray-100">▶</button>
        </div>
      </div>
    </div>
  );
}

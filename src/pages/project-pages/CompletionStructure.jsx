import React from 'react';

function CompletionStructure() {
  const tableData = [
    { subsystem: 'ABB', responsible: 'ABB', completed: 15, outstanding: 6, started: 0, toBeSigned: 0, total: 21 },
    { subsystem: 'AFK', responsible: 'AFK', completed: 5, outstanding: 6, started: 0, toBeSigned: 4, total: 15 },
    { subsystem: 'AULS', responsible: 'AULS', completed: 6, outstanding: 3, started: 0, toBeSigned: 0, total: 9 },
    { subsystem: 'BUS', responsible: 'BUS', completed: 15, outstanding: 45, started: 0, toBeSigned: 0, total: 60 },
    { subsystem: 'EBN', responsible: 'EBN', completed: 0, outstanding: 64, started: 2, toBeSigned: 0, total: 66 },
    // Add more rows if needed; truncated for brevity
  ];

  const totals = { completed: 41, outstanding: 124, started: 2, toBeSigned: 4, total: 171 };

  return (
    <div
      className="relative w-full  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/682078/pexels-photo-682078.jpeg ')", // Web URL for industrial background
      }}
    >
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Main Title */}
      <div className="relative z-10 p-6">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">Process Systems</h1>
      </div>

      {/* Left Sidebar - Subsystem List */}
      <div className="relative z-10 flex h-full">
        {/* Left Panel: Subsystem Folders */}
        <div className="w-1/4 p-4">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-white">
            <h3 className="text-lg font-semibold mb-4 text-white">Sub System Folders</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/50 text-white focus:ring-white" />
                <span>Hanging Gardens (Certificates)</span>
              </li>
              <li className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/50 text-white focus:ring-white" />
                <span>Livering Up Notes</span>
              </li>
              <li className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/50 text-white focus:ring-white" />
                <span>Planning Layers</span>
              </li>
              <li className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/50 text-white focus:ring-white" />
                <span>Milestone (Read only)</span>
              </li>
              <li className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/50 text-white focus:ring-white" />
                <span>CDS Dashboard Trends</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Panel: Main Content */}
        <div className="flex-1 p-4 space-y-6">
          {/* Handover Status Table */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Handover Status</h3>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">Checklists (MCR | RFC | POC | RFOC)</span>
                <select className="px-2 py-1 rounded bg-white/30 text-white text-sm">
                  <option>Punch Status</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white text-sm">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-2 text-left">Subsystem</th>
                    <th className="px-4 py-2 text-left">Responsible</th>
                    <th className="px-4 py-2 text-left">Completed</th>
                    <th className="px-4 py-2 text-left">Outstanding</th>
                    <th className="px-4 py-2 text-left">Started</th>
                    <th className="px-4 py-2 text-left">To be Signed</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-white/20">
                      <td className="px-4 py-2">{row.subsystem}</td>
                      <td className="px-4 py-2">{row.responsible}</td>
                      <td className="px-4 py-2">{row.completed}</td>
                      <td className="px-4 py-2">{row.outstanding}</td>
                      <td className="px-4 py-2">{row.started}</td>
                      <td className="px-4 py-2">{row.toBeSigned}</td>
                      <td className="px-4 py-2 font-semibold">{row.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-white/10 font-semibold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">{totals.completed}</td>
                    <td className="px-4 py-2">{totals.outstanding}</td>
                    <td className="px-4 py-2">{totals.started}</td>
                    <td className="px-4 py-2">{totals.toBeSigned}</td>
                    <td className="px-4 py-2">{totals.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Charts Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* RFC Chart */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">RFC</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white">
                  <span>Overdue</span>
                  <span>0</span>
                </div>
                <div className="h-2 bg-red-500 rounded-full w-0"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Sent</span>
                  <span>217</span>
                </div>
                <div className="h-2 bg-green-500 rounded-full w-full"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Accepted</span>
                  <span>217</span>
                </div>
                <div className="h-2 bg-blue-500 rounded-full w-full"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Remaining</span>
                  <span>0</span>
                </div>
                <div className="h-2 bg-gray-500 rounded-full w-0"></div>
              </div>
            </div>

            {/* RFO Chart */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">RFO</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white">
                  <span>Overdue</span>
                  <span>0</span>
                </div>
                <div className="h-2 bg-red-500 rounded-full w-0"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Sent</span>
                  <span>217</span>
                </div>
                <div className="h-2 bg-green-500 rounded-full w-full"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Accepted</span>
                  <span>217</span>
                </div>
                <div className="h-2 bg-blue-500 rounded-full w-full"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Remaining</span>
                  <span>0</span>
                </div>
                <div className="h-2 bg-gray-500 rounded-full w-0"></div>
              </div>
            </div>

            {/* Remaining Punch Items */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Remaining Punch Items</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white">
                  <span>Remaining A</span>
                  <span>441</span>
                </div>
                <div className="h-2 bg-gray-400 rounded-full w-full"></div>
                <div className="flex justify-between text-xs text-white">
                  <span>Remaining B</span>
                  <span>249</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full w-[56%]"></div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex space-x-4 text-xs text-white">
            <span className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-red-500"></div>
              <span>Overdue</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-green-500"></div>
              <span>Sent</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-500"></div>
              <span>Accepted</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-500"></div>
              <span>Remaining</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-sm">
        <div className="flex space-x-4">
          <span>RFC System Handover Status</span>
          <input type="checkbox" className="ml-2 rounded border-white/50 text-white" />
        </div>
        <div className="flex items-center space-x-2">
          <span>Total: 0</span>
          <div className="w-20 h-8 bg-blue-500 rounded flex items-center justify-center">217</div>
          <div className="w-20 h-8 bg-blue-500 rounded flex items-center justify-center">217</div>
          <div className="w-20 h-8 bg-yellow-500 rounded flex items-center justify-center">690</div>
        </div>
      </div>
    </div>
  );
}

export default CompletionStructure;
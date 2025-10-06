import React from 'react';

function ProjectDashboard() {
  return (
    <div id="dashboard-content" className="p-6 bg-[#0f111a] min-h-screen text-white">

      {/* Row 1: 3 Cards in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Project Information */}
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-400">Project Information</p>
            <div className="p-3 bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Superusers */}
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Active Superusers</p>
              <h3 className="text-2xl font-bold text-white mt-1">87</h3>
              <p className="text-sm text-red-400 mt-1">-3.2% from last month</p>
            </div>
            <div className="p-3 bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">1,248</h3>
              <p className="text-sm text-green-400 mt-1">+12.3% from last month</p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Project Skyline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-400">Project Skyline</p>
            <div className="p-3 bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17V9m4 8V5m4 12v-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Project Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-400">Project Schedule</p>
            <div className="p-3 bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17V9m4 8V5m4 12v-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default ProjectDashboard;

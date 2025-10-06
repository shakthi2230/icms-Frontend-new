import React from 'react';

function AdminDashboard() {
  return (
    <div id="dashboard-content" className="p-6 bg-[#0f111a] min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Companies */}
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Companies</p>
              <h3 className="text-2xl font-bold text-white mt-1">24</h3>
              <p className="text-sm text-green-400 mt-1">+2.5% from last month</p>
            </div>
            <div className="p-3 bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Ongoing Projects</p>
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

        {/* Total Active Users */}
        <div className="bg-[#1e2130] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Active Users</p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e2130] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {/* Add New Company */}
            <button className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition">
              <div className="w-8 h-8 bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white">Add New Company</span>
            </button>

            {/* Create New User */}
            <button className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white">Create New User</span>
            </button>

            {/* Start New Project */}
            <button className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white">Start New Project</span>
            </button>

            {/* Generate Report */}
            <button className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition">
              <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white">Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCompanyModal from './Components/AddCompanyModal';
import UserModal from './Components/UserModal';
import ProjectModal from './Components/ProjectModal';
import useCompanyStore from '../../store/companyStore';
import useUserStore from "./store/userStore";
import useProjectStore from "./store/projectStore";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  
  // Get companies, users, and projects from Zustand stores
  const { companies } = useCompanyStore();
  const { users } = useUserStore();
  const { projects } = useProjectStore();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleAddCompany = () => {
    setShowAddCompanyModal(true);
  };

  const handleCloseAddCompanyModal = () => {
    setShowAddCompanyModal(false);
  };

  const handleCreateUser = () => {
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  const handleCreateProject = () => {
    setShowProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
  };

  // Calculate statistics
  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(company => company.status === 'Active').length;
  const inactiveCompanies = companies.filter(company => company.status === 'Inactive').length;

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const inactiveUsers = users.filter(user => user.status === 'Inactive').length;
  const superUsers = users.filter(user => user.isSuperUser).length;

  const totalProjects = projects.length;
  const activeProjects = projects.filter(project => project.status === 'Active').length;
  const inactiveProjects = projects.filter(project => project.status === 'Inactive').length;
  
  // Calculate project budget statistics
  const totalBudget = projects.reduce((sum, project) => sum + (parseFloat(project.budget) || 0), 0);
  const averageBudget = totalProjects > 0 ? totalBudget / totalProjects : 0;

  // Calculate project timeline statistics
  const upcomingProjects = projects.filter(project => {
    const startDate = new Date(project.startDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
    return startDate > new Date() && startDate <= thirtyDaysFromNow;
  }).length;

  // Calculate percentage change
  const getPercentageChange = (current, previous = 0) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  // For demo purposes
  const previousMonthCompanies = Math.max(0, totalCompanies - 2);
  const previousMonthUsers = Math.max(0, totalUsers - 1);
  const previousMonthProjects = Math.max(0, totalProjects - 1);

  return (
    <div id="dashboard-content" className="p-4 sm:p-6 bg-[#0f111a] min-h-screen">
      {/* Add Company Modal */}
      <AddCompanyModal 
        isOpen={showAddCompanyModal}
        onClose={handleCloseAddCompanyModal}
      />

      {/* User Modal */}
      <UserModal 
        isOpen={showUserModal}
        onClose={handleCloseUserModal}
      />

      {/* Project Modal */}
      <ProjectModal 
        isOpen={showProjectModal}
        onClose={handleCloseProjectModal}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Companies */}
        <div className="bg-[#1e2130] rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Total Companies</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{totalCompanies}</h3>
              <p className={`text-xs sm:text-sm mt-1 ${
                totalCompanies >= previousMonthCompanies ? 'text-green-400' : 'text-red-400'
              }`}>
                {getPercentageChange(totalCompanies, previousMonthCompanies)} from last month
              </p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                  {activeCompanies} Active
                </span>
                <span className="text-xs text-gray-400 bg-gray-700/30 px-2 py-1 rounded">
                  {inactiveCompanies} Inactive
                </span>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-900 rounded-lg flex-shrink-0">
              <svg className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-[#1e2130] rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Total Users</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{totalUsers}</h3>
              <p className={`text-xs sm:text-sm mt-1 ${
                totalUsers >= previousMonthUsers ? 'text-green-400' : 'text-red-400'
              }`}>
                {getPercentageChange(totalUsers, previousMonthUsers)} from last month
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                  {activeUsers} Active
                </span>
                <span className="text-xs text-gray-400 bg-gray-700/30 px-2 py-1 rounded">
                  {inactiveUsers} Inactive
                </span>
                <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                  {superUsers} Super Users
                </span>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-blue-900 rounded-lg flex-shrink-0">
              <svg className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Projects - UPDATED DYNAMIC CARD */}
        <div className="bg-[#1e2130] rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Total Projects</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{totalProjects}</h3>
              <p className={`text-xs sm:text-sm mt-1 ${
                totalProjects >= previousMonthProjects ? 'text-green-400' : 'text-red-400'
              }`}>
                {getPercentageChange(totalProjects, previousMonthProjects)} from last month
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                  {activeProjects} Active
                </span>
                <span className="text-xs text-gray-400 bg-gray-700/30 px-2 py-1 rounded">
                  {inactiveProjects} Inactive
                </span>
                <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                  {upcomingProjects} Upcoming
                </span>
              </div>
              {totalBudget > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-700/50">
                  <p className="text-xs text-gray-400">Total Budget</p>
                  <p className="text-xs text-yellow-400 font-semibold">{formatCurrency(totalBudget)}</p>
                </div>
              )}
            </div>
            <div className="p-2 sm:p-3 bg-green-900 rounded-lg flex-shrink-0">
              <svg className="w-5 sm:w-6 h-5 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      
      

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-[#1e2130] rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            {/* Add New Company */}
            <button 
              onClick={handleAddCompany}
              className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition duration-200"
            >
              <div className="w-8 h-8 bg-yellow-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white text-sm sm:text-base truncate">Add New Company</span>
            </button>

            {/* Create New User */}
            <button 
              onClick={handleCreateUser}
              className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition duration-200"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white text-sm sm:text-base truncate">Create New User</span>
            </button>

            {/* Start New Project - Now opens modal instead of navigating */}
            <button 
              onClick={handleCreateProject}
              className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition duration-200"
            >
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white text-sm sm:text-base truncate">Start New Project</span>
            </button>

            {/* Generate Report */}
            <button 
              onClick={() => handleNavigate('/admin-dashboard/generate-report')}
              className="w-full flex items-center p-3 bg-[#2b2e3c] hover:bg-[#3a3d4e] rounded-lg transition duration-200"
            >
              <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-white text-sm sm:text-base truncate">Generate Report</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1e2130] rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {companies.length > 0 || users.length > 0 || projects.length > 0 ? (
              <>
                {/* Show recent projects */}
                {projects.slice(-3).reverse().map((project, index) => (
                  <div key={`project-${project.id}`} className="flex items-center justify-between p-3 bg-[#2b2e3c] rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        project.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <span className="text-white text-sm block">New project: {project.projectName}</span>
                        <span className="text-gray-400 text-xs">{project.projectType} • {project.company}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {index === 0 ? 'Just now' : index === 1 ? '5 min ago' : '1 hour ago'}
                    </span>
                  </div>
                ))}
                
                {/* Show recent companies */}
                {companies.slice(-2).reverse().map((company, index) => (
                  <div key={`company-${company.id}`} className="flex items-center justify-between p-3 bg-[#2b2e3c] rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        company.status === 'Active' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <span className="text-white text-sm block">New company: {company.companyName}</span>
                        <span className="text-gray-400 text-xs">{company.industryType}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {index === 0 ? '2 hours ago' : '3 hours ago'}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">No recent activity</p>
                <p className="text-gray-500 text-xs mt-1">Add companies, users, or projects to see activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
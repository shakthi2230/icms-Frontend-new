import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Briefcase, MapPin, Calendar, Users, DollarSign, AlertCircle, CheckCircle, Building, Target, Clock, FileText } from 'lucide-react';

export default function AddNewProject() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: 'Ghawar Oil Field Expansion',
      projectCode: 'PRJ-2024-001',
      company: 'Saudi Aramco Limited',
      location: 'Riyadh, Saudi Arabia',
      projectType: 'Oil Exploration',
      startDate: '2024-01-15',
      endDate: '2025-12-31',
      status: 'In Progress',
      budget: 450000000,
      allocatedTeam: 250,
      projectManager: 'Ahmed Al-Saud',
      description: 'Expansion of Ghawar oil field capacity'
    },
    {
      id: 2,
      projectName: 'Mumbai Refinery Upgrade',
      projectCode: 'PRJ-2024-002',
      company: 'Shell Oil India',
      location: 'Mumbai, India',
      projectType: 'Refining Facility',
      startDate: '2024-03-01',
      endDate: '2025-09-30',
      status: 'In Progress',
      budget: 320000000,
      allocatedTeam: 180,
      projectManager: 'Rajesh Kumar',
      description: 'Modernization of Mumbai refinery units'
    }
  ]);

  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
    company: '',
    location: '',
    projectType: 'Oil Exploration',
    startDate: '',
    endDate: '',
    budget: '',
    allocatedTeam: '',
    projectManager: '',
    description: '',
    technicalLead: '',
    clientName: '',
    targetProduction: '',
    riskLevel: 'Medium'
  });

  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.projectName || !formData.projectCode || !formData.company || !formData.location || 
        !formData.startDate || !formData.endDate || !formData.budget || !formData.allocatedTeam ||
        !formData.projectManager) {
      setAlert({ show: true, message: 'All required fields must be filled', type: 'error' });
      return false;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setAlert({ show: true, message: 'End date must be after start date', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      const newProject = {
        id: projects.length + 1,
        projectName: formData.projectName,
        projectCode: formData.projectCode,
        company: formData.company,
        location: formData.location,
        projectType: formData.projectType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 'Pending',
        budget: formData.budget,
        allocatedTeam: formData.allocatedTeam,
        projectManager: formData.projectManager,
        description: formData.description
      };

      setProjects([...projects, newProject]);
      
      setAlert({
        show: true,
        message: `Project "${formData.projectName}" created successfully!`,
        type: 'success'
      });

      setFormData({
        projectName: '',
        projectCode: '',
        company: '',
        location: '',
        projectType: 'Oil Exploration',
        startDate: '',
        endDate: '',
        budget: '',
        allocatedTeam: '',
        projectManager: '',
        description: '',
        technicalLead: '',
        clientName: '',
        targetProduction: '',
        riskLevel: 'Medium'
      });

      setShowForm(false);
      setLoading(false);

      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    }, 1500);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
    setAlert({ show: true, message: 'Project deleted successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress':
        return 'bg-blue-900/30 text-blue-300 border-blue-700/50';
      case 'Completed':
        return 'bg-green-900/30 text-green-300 border-green-700/50';
      case 'Pending':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50';
      case 'On Hold':
        return 'bg-orange-900/30 text-orange-300 border-orange-700/50';
      default:
        return 'bg-gray-900/30 text-gray-300 border-gray-700/50';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#0f111a]">
      {/* Alert Message */}
      {alert.show && (
        <div className={`fixed top-4 right-4 rounded-xl p-4 flex items-center gap-3 z-50 max-w-md shadow-lg border ${
          alert.type === 'success' 
            ? 'bg-green-900/20 text-green-100 border-green-700/50' 
            : 'bg-red-900/20 text-red-100 border-red-700/50'
        }`}>
          {alert.type === 'success' ? (
            <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm sm:text-base">{alert.message}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Project Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Create and manage oil & gas projects</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Create Project</span>
          </button>
        )}
      </div>

      {/* Add Project Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-4xl border border-gray-700/50 my-8">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-700/50 sticky top-0 bg-[#1e2130] rounded-t-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Create New Project</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Project Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Briefcase size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Project Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Project Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Project Name <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      placeholder="Enter project name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Project Code */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Project Code <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="projectCode"
                      value={formData.projectCode}
                      onChange={handleInputChange}
                      placeholder="e.g., PRJ-2024-001"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Building size={16} /> Company <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Select or enter company name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Project Type <span className="text-yellow-400">*</span></label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                    >
                      <option>Oil Exploration</option>
                      <option>Oil Extraction</option>
                      <option>Refining Facility</option>
                      <option>Pipeline Construction</option>
                      <option>Gas Processing</option>
                      <option>Petrochemical Plant</option>
                      <option>Storage Terminal</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Project description and objectives"
                      rows="3"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Scope Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <MapPin size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Location & Scope</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Location <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Riyadh, Saudi Arabia"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Risk Level */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Risk Level</label>
                    <select
                      name="riskLevel"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>

                  {/* Target Production */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Target size={16} /> Target Production
                    </label>
                    <input
                      type="text"
                      name="targetProduction"
                      value={formData.targetProduction}
                      onChange={handleInputChange}
                      placeholder="e.g., 500,000 barrels/day"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Client Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="Primary client name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Calendar size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Timeline</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Start Date <span className="text-yellow-400">*</span></label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">End Date <span className="text-yellow-400">*</span></label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Resources Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <DollarSign size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Budget & Resources</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Budget (USD) <span className="text-yellow-400">*</span></label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="e.g., 450000000"
                      min="0"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Allocated Team */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Users size={16} /> Allocated Team <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="allocatedTeam"
                      value={formData.allocatedTeam}
                      onChange={handleInputChange}
                      placeholder="Number of team members"
                      min="1"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Team Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Users size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Team</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Project Manager */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Project Manager <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="projectManager"
                      value={formData.projectManager}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Technical Lead */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Technical Lead</label>
                    <input
                      type="text"
                      name="technicalLead"
                      value={formData.technicalLead}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-6 border-t border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-700/30 hover:bg-gray-700/50 text-white font-semibold rounded-lg transition border border-gray-600/50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-black font-semibold rounded-lg transition transform hover:scale-105 disabled:scale-100"
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-[#1e2130] rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
        {/* Table Header */}
        <div className="px-6 py-6 border-b border-gray-700/50 bg-gradient-to-r from-[#1e2130] to-[#252a38]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Active Projects <span className="text-yellow-400 text-lg">({projects.length})</span></h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#16181f] border-b border-gray-700/50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Project Name</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Code</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Budget</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Team</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {projects.length > 0 ? (
                projects.map(project => (
                  <tr key={project.id} className="hover:bg-[#252a38] transition duration-200 group">
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-white font-semibold">{project.projectName}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 font-mono bg-gray-900/50">{project.projectCode}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{project.company}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{project.location}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-yellow-400 font-semibold">{formatCurrency(project.budget)}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{project.allocatedTeam} members</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition" title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 sm:px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Briefcase size={48} className="text-gray-600" />
                      <p className="text-gray-400 text-sm sm:text-base">No projects created yet</p>
                      <p className="text-gray-500 text-xs">Click "Create Project" to start your first project</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
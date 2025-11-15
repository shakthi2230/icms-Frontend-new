import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import useProjectStore from "./store/projectStore.jsx";
import ProjectModal from "./components/ProjectModal.jsx";

export default function AddNewProject() {
  const {
    projects,
    deleteProject,
    toggleProjectStatus,
  } = useProjectStore();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleView = (project) => {
    setViewingProject(project);
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      showAlert('Project deleted successfully', 'success');
      setProjectToDelete(null);
    }
  };

  const handleStatusToggle = (project) => {
    toggleProjectStatus(project.id);
    showAlert(`Project status changed to ${project.status === 'Active' ? 'Inactive' : 'Active'}`, 'success');
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-900/30 text-green-300 border-green-700/50' 
      : 'bg-gray-700/30 text-gray-300 border-gray-600/50';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

      {/* Project Modal */}
      <ProjectModal 
        isOpen={showProjectModal}
        onClose={handleCloseProjectModal}
        editingProject={editingProject}
        onSuccess={(message, type) => showAlert(message, type)}
      />

      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Project Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Create and manage oil & gas projects</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Create Project</span>
        </button>
      </div>

      {/* View Project Details Modal */}
      {viewingProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-4xl border border-gray-700/50">
            <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white">Project Details</h2>
              <button
                onClick={() => setViewingProject(null)}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400">Project Name</label>
                  <p className="text-white font-semibold text-lg">{viewingProject.projectName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Project Code</label>
                  <p className="text-white font-mono">{viewingProject.projectCode}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Company</label>
                  <p className="text-white">{viewingProject.company}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(viewingProject.status)}`}>
                    {viewingProject.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Location</label>
                  <p className="text-white">{viewingProject.location}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Project Type</label>
                  <p className="text-white">{viewingProject.projectType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Start Date</label>
                  <p className="text-white">{formatDate(viewingProject.startDate)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">End Date</label>
                  <p className="text-white">{formatDate(viewingProject.endDate)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Budget</label>
                  <p className="text-yellow-400 font-semibold">{formatCurrency(viewingProject.budget)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Risk Level</label>
                  <p className="text-white">{viewingProject.riskLevel}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Technical Lead</label>
                  <p className="text-white">{viewingProject.technicalLead}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Engineering Lead</label>
                  <p className="text-white">{viewingProject.engineeringLead}</p>
                </div>
                {viewingProject.targetProduction && (
                  <div>
                    <label className="text-sm text-gray-400">Target Production</label>
                    <p className="text-white">{viewingProject.targetProduction}</p>
                  </div>
                )}
                {viewingProject.clientName && (
                  <div>
                    <label className="text-sm text-gray-400">Client Name</label>
                    <p className="text-white">{viewingProject.clientName}</p>
                  </div>
                )}
              </div>
              {viewingProject.description && (
                <div>
                  <label className="text-sm text-gray-400">Description</label>
                  <p className="text-white mt-1">{viewingProject.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-md border border-gray-700/50">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertCircle size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Confirm Delete</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <strong>{projectToDelete.projectName}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setProjectToDelete(null)}
                  className="px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 text-white font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-[#1e2130] rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
        <div className="px-6 py-6 border-b border-gray-700/50 bg-gradient-to-r from-[#1e2130] to-[#252a38]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Active Projects <span className="text-yellow-400 text-lg">({projects.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#16181f] border-b border-gray-700/50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Project Name</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Code</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Budget</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Timeline</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {projects.length > 0 ? (
                projects.map(project => (
                  <tr key={project.id} className="hover:bg-[#252a38] transition duration-200 group">
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => handleView(project)}
                        className="text-xs sm:text-sm text-white font-semibold hover:text-yellow-400 transition text-left"
                      >
                        {project.projectName}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 font-mono bg-gray-900/50">{project.projectCode}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{project.company}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{project.location}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-yellow-400 font-semibold">{formatCurrency(project.budget)}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <button
                        onClick={() => handleStatusToggle(project)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${getStatusColor(project.status)} hover:opacity-80`}
                      >
                        {project.status}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button 
                          onClick={() => handleView(project)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition" 
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(project)}
                          className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition" 
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition" 
                          title="Delete"
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
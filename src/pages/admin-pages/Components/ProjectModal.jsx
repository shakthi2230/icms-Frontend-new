import React, { useState, useEffect } from 'react';
import { X, Briefcase, MapPin, Calendar, Users, DollarSign, Building, Target, User } from 'lucide-react';
import useProjectStore from "../store/projectStore";
import useCompanyStore from "../../../store/companyStore";

export default function ProjectModal({ isOpen, onClose, editingProject = null, onSuccess }) {
  const { addProject, updateProject } = useProjectStore();
  const { companies } = useCompanyStore();
  
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');

  const initialFormData = {
    projectName: '',
    projectCode: '',
    company: '',
    location: '',
    projectType: 'Oil Exploration',
    startDate: '',
    endDate: '',
    budget: '',
    technicalLead: '',
    engineeringLead: '',
    description: '',
    clientName: '',
    targetProduction: '',
    riskLevel: 'Medium'
  };

  const [formData, setFormData] = useState(initialFormData);

  // Reset form when modal opens/closes or editing project changes
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        setFormData({
          projectName: editingProject.projectName || '',
          projectCode: editingProject.projectCode || '',
          company: editingProject.company || '',
          location: editingProject.location || '',
          projectType: editingProject.projectType || 'Oil Exploration',
          startDate: editingProject.startDate || '',
          endDate: editingProject.endDate || '',
          budget: editingProject.budget || '',
          technicalLead: editingProject.technicalLead || '',
          engineeringLead: editingProject.engineeringLead || '',
          description: editingProject.description || '',
          clientName: editingProject.clientName || '',
          targetProduction: editingProject.targetProduction || '',
          riskLevel: editingProject.riskLevel || 'Medium'
        });
        setSelectedCompany(editingProject.company || '');
      } else {
        setFormData(initialFormData);
        setSelectedCompany('');
      }
    }
  }, [isOpen, editingProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setSelectedCompany(value);
    setFormData(prev => ({
      ...prev,
      company: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'projectName', 'projectCode', 'company', 'location', 
      'startDate', 'endDate', 'budget', 'technicalLead', 'engineeringLead'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      if (onSuccess) onSuccess('All required fields must be filled', 'error');
      return false;
    }
    
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      if (onSuccess) onSuccess('End date must be after start date', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      try {
        if (editingProject) {
          updateProject(editingProject.id, formData);
          if (onSuccess) onSuccess('Project updated successfully!', 'success');
        } else {
          addProject(formData);
          if (onSuccess) onSuccess(`Project "${formData.projectName}" created successfully!`, 'success');
        }

        // Close modal after successful submission
        setTimeout(() => {
          onClose();
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error saving project:', error);
        if (onSuccess) onSuccess('Error saving project data', 'error');
        setLoading(false);
      }
    }, 1000);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedCompany('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e2130] rounded-2xl w-full max-w-6xl border border-gray-700/50 max-h-[90vh] flex flex-col">
        {/* Form Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50 sticky top-0 bg-[#1e2130] rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-white">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={resetForm}
            className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Project Details Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Briefcase size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Project Details</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Project Name <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Project Code <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleInputChange}
                  placeholder="e.g., PRJ-2024-001"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <Building size={16} /> Company <span className="text-yellow-400">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                    className="flex-1 px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                  >
                    <option value="">Select a company</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-400 text-sm py-2">or</span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="flex-1 px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Project Type <span className="text-yellow-400">*</span></label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
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

              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Project description and objectives"
                  rows="3"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Location & Scope Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <MapPin size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Location & Scope</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Location <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Riyadh, Saudi Arabia"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Risk Level</label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

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
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Primary client name"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Calendar size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Timeline</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Start Date <span className="text-yellow-400">*</span></label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">End Date <span className="text-yellow-400">*</span></label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <DollarSign size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Budget</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Budget (USD) <span className="text-yellow-400">*</span></label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 450000000"
                  min="0"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Users size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Team Leadership</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <User size={16} /> Technical Lead <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="text"
                  name="technicalLead"
                  value={formData.technicalLead}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <User size={16} /> Engineering Lead <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="text"
                  name="engineeringLead"
                  value={formData.engineeringLead}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-700/30 hover:bg-gray-700/50 text-white font-semibold rounded-lg transition border border-gray-600/50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-black font-semibold rounded-lg transition transform hover:scale-105 disabled:scale-100"
            >
              {loading 
                ? (editingProject ? 'Updating...' : 'Creating...') 
                : (editingProject ? 'Update Project' : 'Create Project')
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Mail, User, Lock, Building, Phone, MapPin, Briefcase, Users, Zap, ChevronDown, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import useCompanyStore from "../../store/companyStore.jsx";

export default function AddNewCompany() {
  const {
    companies,
    addCompany,
    updateCompany,
    deleteCompany,
    toggleCompanyStatus,
    getCompanyById,
  } = useCompanyStore();

  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    companyName: '',
    registrationNumber: '',
    industryType: 'Oil & Gas Exploration',
    email: '',
    phone: '',
    address: '',
    country: '',
    establishedYear: new Date().getFullYear(),
    operatingArea: '',
    totalEmployees: '',
    username: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    contactPerson: '',
    contactDesignation: '',
    website: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FIXED: Separate validation for add vs edit
  const validateForm = (isEditing = false) => {
    const requiredFields = [
      'companyName', 'registrationNumber', 'email', 'phone', 
      'address', 'country', 'username', 'operatingArea', 'totalEmployees'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      showAlert('All required fields must be filled', 'error');
      return false;
    }
    
    if (!isEditing && (!formData.password || !formData.confirmPassword)) {
      showAlert('Password fields are required for new companies', 'error');
      return false;
    }
    
    if (!isEditing && formData.password !== formData.confirmPassword) {
      showAlert('Passwords do not match', 'error');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showAlert('Invalid email format', 'error');
      return false;
    }
    
    return true;
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  // FIXED: Submit handler with proper validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isEditing = !!editingCompany;
    
    if (!validateForm(isEditing)) return;

    setLoading(true);
    
    setTimeout(() => {
      try {
        // Prepare data for submission (remove password fields for editing)
        const submissionData = { ...formData };
        
        if (isEditing) {
          // Remove password fields when editing
          delete submissionData.password;
          delete submissionData.confirmPassword;
          
          updateCompany(editingCompany.id, submissionData);
          showAlert('Company updated successfully!', 'success');
        } else {
          // For new company, include all data
          addCompany(submissionData);
          showAlert(`Company registered successfully! Login credentials sent to ${formData.email}`, 'success');
        }

        resetForm();
        setLoading(false);
      } catch (error) {
        console.error('Error saving company:', error);
        showAlert('Error saving company data', 'error');
        setLoading(false);
      }
    }, 1000);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingCompany(null);
    setShowForm(false);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      companyName: company.companyName || '',
      registrationNumber: company.registrationNumber || '',
      industryType: company.industryType || 'Oil & Gas Exploration',
      email: company.email || '',
      phone: company.phone || '',
      address: company.address || '',
      country: company.country || '',
      establishedYear: company.establishedYear || new Date().getFullYear(),
      operatingArea: company.operatingArea || '',
      totalEmployees: company.totalEmployees || '',
      username: company.username || '',
      password: '', // Empty for editing
      confirmPassword: '', // Empty for editing
      licenseNumber: company.licenseNumber || '',
      contactPerson: company.contactPerson || '',
      contactDesignation: company.contactDesignation || '',
      website: company.website || ''
    });
    setShowForm(true);
  };

  const handleView = (company) => {
    setViewingCompany(company);
  };

  const handleDelete = (company) => {
    setCompanyToDelete(company);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      deleteCompany(companyToDelete.id);
      showAlert('Company deleted successfully', 'success');
      setCompanyToDelete(null);
    }
  };

  const handleStatusToggle = (company) => {
    toggleCompanyStatus(company.id);
    showAlert(`Company status changed to ${company.status === 'Active' ? 'Inactive' : 'Active'}`, 'success');
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-900/30 text-green-300 border-green-700/50' 
      : 'bg-gray-700/30 text-gray-300 border-gray-600/50';
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Company Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Register and manage oil & gas companies</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Register Company</span>
          </button>
        )}
      </div>

      {/* Add/Edit Company Form - UPDATED WIDTH AND HEIGHT */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-6xl border border-gray-700/50 max-h-[90vh] flex flex-col">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700/50 sticky top-0 bg-[#1e2130] rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-white">
                {editingCompany ? 'Edit Company' : 'Register New Company'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content - UPDATED: Reduced spacing and optimized layout */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Company Information Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Building size={20} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Company Information</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Company Name <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Registration Number <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., SA-2024-001"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Industry Type <span className="text-yellow-400">*</span></label>
                    <select
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                    >
                      <option>Oil & Gas Exploration</option>
                      <option>Oil & Gas Refining</option>
                      <option>Oil & Gas Distribution</option>
                      <option>Petrochemicals</option>
                      <option>Drilling & Extraction</option>
                      <option>Pipeline Transportation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Year Established <span className="text-yellow-400">*</span></label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={formData.establishedYear}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Operating license"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Operations Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <MapPin size={20} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Location & Operations</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Country <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g., Saudi Arabia"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Address <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Headquarters address"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Operating Area <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="operatingArea"
                      value={formData.operatingArea}
                      onChange={handleInputChange}
                      placeholder="e.g., Middle East"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Users size={14} /> Total Employees <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalEmployees"
                      value={formData.totalEmployees}
                      onChange={handleInputChange}
                      placeholder="e.g., 5000"
                      min="1"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Briefcase size={20} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Designation</label>
                    <input
                      type="text"
                      name="contactDesignation"
                      value={formData.contactDesignation}
                      onChange={handleInputChange}
                      placeholder="e.g., CEO"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Mail size={14} /> Email <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@email.com"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Phone size={14} /> Phone <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Login Credentials Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Lock size={20} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Login Credentials</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <User size={14} /> Username <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {!editingCompany && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                          <Zap size={14} /> Password <span className="text-yellow-400">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter password"
                          className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                          <Lock size={14} /> Confirm Password <span className="text-yellow-400">*</span>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm password"
                          className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                        />
                      </div>
                    </>
                  )}
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
                    ? (editingCompany ? 'Updating...' : 'Registering...') 
                    : (editingCompany ? 'Update Company' : 'Register Company')
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Company Details Modal */}
      {viewingCompany && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-2xl border border-gray-700/50">
            <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white">Company Details</h2>
              <button
                onClick={() => setViewingCompany(null)}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Company Name</label>
                  <p className="text-white font-semibold">{viewingCompany.companyName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Registration Number</label>
                  <p className="text-white font-mono">{viewingCompany.registrationNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Industry Type</label>
                  <p className="text-white">{viewingCompany.industryType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(viewingCompany.status)}`}>
                    {viewingCompany.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white">{viewingCompany.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-white">{viewingCompany.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Address</label>
                  <p className="text-white">{viewingCompany.address}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Country</label>
                  <p className="text-white">{viewingCompany.country}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Operating Area</label>
                  <p className="text-white">{viewingCompany.operatingArea}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Total Employees</label>
                  <p className="text-white">{viewingCompany.totalEmployees}</p>
                </div>
                {viewingCompany.website && (
                  <div>
                    <label className="text-sm text-gray-400">Website</label>
                    <p className="text-white">{viewingCompany.website}</p>
                  </div>
                )}
                {viewingCompany.contactPerson && (
                  <div>
                    <label className="text-sm text-gray-400">Contact Person</label>
                    <p className="text-white">{viewingCompany.contactPerson}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {companyToDelete && (
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
                Are you sure you want to delete <strong>{companyToDelete.companyName}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setCompanyToDelete(null)}
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

      {/* Companies Table */}
      <div className="bg-[#1e2130] rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
        <div className="px-6 py-6 border-b border-gray-700/50 bg-gradient-to-r from-[#1e2130] to-[#252a38]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Registered Companies <span className="text-yellow-400 text-lg">({companies.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#16181f] border-b border-gray-700/50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Reg. Number</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Industry</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Country</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Area</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {companies.length > 0 ? (
                companies.map(company => (
                  <tr key={company.id} className="hover:bg-[#252a38] transition duration-200 group">
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => handleView(company)}
                        className="text-xs sm:text-sm text-white font-semibold hover:text-yellow-400 transition text-left"
                      >
                        {company.companyName}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 font-mono bg-gray-900/50">{company.registrationNumber}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{company.industryType}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{company.country}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{company.operatingArea}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 truncate">{company.email}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <button
                        onClick={() => handleStatusToggle(company)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${getStatusColor(company.status)} hover:opacity-80`}
                      >
                        {company.status}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button 
                          onClick={() => handleView(company)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition" 
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(company)}
                          className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition" 
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(company)}
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
                      <Building size={48} className="text-gray-600" />
                      <p className="text-gray-400 text-sm sm:text-base">No companies registered yet</p>
                      <p className="text-gray-500 text-xs">Click "Register Company" to add your first company</p>
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
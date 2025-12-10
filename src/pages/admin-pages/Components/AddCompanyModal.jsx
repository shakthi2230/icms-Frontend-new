import React, { useState, useEffect } from 'react';
import { X, Mail, User, Lock, Building, Phone, MapPin, Briefcase, Users, Zap } from 'lucide-react';
import useCompanyStore from "../../../store/companyStore";

export default function AddCompanyModal({ isOpen, onClose, editingCompany = null, onSuccess }) {
  const { addCompany, updateCompany } = useCompanyStore();

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

  // Reset form when modal opens/closes or editing company changes
  useEffect(() => {
    if (isOpen) {
      if (editingCompany) {
        setFormData({
          companyName: editingCompany.companyName || '',
          registrationNumber: editingCompany.registrationNumber || '',
          industryType: editingCompany.industryType || 'Oil & Gas Exploration',
          email: editingCompany.email || '',
          phone: editingCompany.phone || '',
          address: editingCompany.address || '',
          country: editingCompany.country || '',
          establishedYear: editingCompany.establishedYear || new Date().getFullYear(),
          operatingArea: editingCompany.operatingArea || '',
          totalEmployees: editingCompany.totalEmployees || '',
          username: editingCompany.username || '',
          password: '',
          confirmPassword: '',
          licenseNumber: editingCompany.licenseNumber || '',
          contactPerson: editingCompany.contactPerson || '',
          contactDesignation: editingCompany.contactDesignation || '',
          website: editingCompany.website || ''
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [isOpen, editingCompany]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (isEditing = false) => {
    const requiredFields = [
      'companyName', 'registrationNumber', 'email', 'phone',
      'address', 'country', 'username', 'operatingArea', 'totalEmployees'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      if (onSuccess) onSuccess('All required fields must be filled', 'error');
      return false;
    }

    if (!isEditing && (!formData.password || !formData.confirmPassword)) {
      if (onSuccess) onSuccess('Password fields are required for new companies', 'error');
      return false;
    }

    if (!isEditing && formData.password !== formData.confirmPassword) {
      if (onSuccess) onSuccess('Passwords do not match', 'error');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      if (onSuccess) onSuccess('Invalid email format', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEditing = !!editingCompany;

    if (!validateForm(isEditing)) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const submissionData = { ...formData };

        if (isEditing) {
          delete submissionData.password;
          delete submissionData.confirmPassword;
          updateCompany(editingCompany.id, submissionData);
          if (onSuccess) onSuccess('Company updated successfully!', 'success');
        } else {
          addCompany(submissionData);
          if (onSuccess) onSuccess(`Company registered successfully! Login credentials sent to ${formData.email}`, 'success');
        }

        // Close modal after successful submission
        setTimeout(() => {
          onClose();
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Error saving company:', error);
        if (onSuccess) onSuccess('Error saving company data', 'error');
        setLoading(false);
      }
    }, 1000);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    onClose();
  };

  const allRequiredFilled = () => {
    const required = [
      'companyName', 'registrationNumber', 'email', 'phone',
      'address', 'country', 'username', 'operatingArea', 'totalEmployees'
    ];

    // For new company, password fields required too
    if (!editingCompany) {
      required.push('password', 'confirmPassword');
    }

    return required.every(field => formData[field] && formData[field].toString().trim() !== '');
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e2130] rounded-2xl w-full max-w-7xl border border-gray-700/50 max-h-[90vh] flex flex-col">
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

        {/* Form Content */}
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
              className={`px-8 py-2 font-semibold rounded-lg transition transform
    ${allRequiredFilled()
                  ? "bg-green-500 hover:bg-green-600 text-black hover:scale-105"
                  : "bg-yellow-500 hover:bg-yellow-600 text-black"}
    disabled:bg-gray-500 disabled:scale-100`}
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
  );
}
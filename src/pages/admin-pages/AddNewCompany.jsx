import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Mail, User, Lock, Building, Phone, MapPin, Briefcase, Users, Zap, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';

export default function AddNewCompany() {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: 'Saudi Aramco Limited',
      registrationNumber: 'SA-2024-001',
      industryType: 'Oil & Gas Exploration',
      email: 'admin@saudiaramco.com',
      phone: '+966 1234 56789',
      address: 'Riyadh, Saudi Arabia',
      country: 'Saudi Arabia',
      establishedYear: 1933,
      username: 'aramco_admin',
      status: 'Active',
      operatingArea: 'Middle East',
      totalEmployees: 75000
    },
    {
      id: 2,
      companyName: 'Shell Oil India',
      registrationNumber: 'IN-2024-002',
      industryType: 'Oil & Gas Refining',
      email: 'info@shelloindia.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, India',
      country: 'India',
      establishedYear: 1950,
      username: 'shell_admin',
      status: 'Active',
      operatingArea: 'Asia Pacific',
      totalEmployees: 12000
    }
  ]);

  const [formData, setFormData] = useState({
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
  });

  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.companyName || !formData.registrationNumber || !formData.email || !formData.phone || 
        !formData.address || !formData.country || !formData.username || !formData.password ||
        !formData.operatingArea || !formData.totalEmployees) {
      setAlert({ show: true, message: 'All required fields must be filled', type: 'error' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setAlert({ show: true, message: 'Passwords do not match', type: 'error' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setAlert({ show: true, message: 'Invalid email format', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      const newCompany = {
        id: companies.length + 1,
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        industryType: formData.industryType,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        country: formData.country,
        establishedYear: formData.establishedYear,
        username: formData.username,
        status: 'Active',
        operatingArea: formData.operatingArea,
        totalEmployees: formData.totalEmployees
      };

      setCompanies([...companies, newCompany]);
      
      setAlert({
        show: true,
        message: `Company registered successfully! Login credentials sent to ${formData.email}`,
        type: 'success'
      });

      setFormData({
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
      });

      setShowForm(false);
      setLoading(false);

      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    }, 1500);
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
    setAlert({ show: true, message: 'Company deleted successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
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

      {/* Add Company Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-4xl border border-gray-700/50 my-8">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-700/50 sticky top-0 bg-[#1e2130] rounded-t-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Register New Company</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Company Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Building size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Company Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Company Name <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Registration Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Registration Number <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., SA-2024-001"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Industry Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Industry Type <span className="text-yellow-400">*</span></label>
                    <select
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                    >
                      <option>Oil & Gas Exploration</option>
                      <option>Oil & Gas Refining</option>
                      <option>Oil & Gas Distribution</option>
                      <option>Petrochemicals</option>
                      <option>Drilling & Extraction</option>
                      <option>Pipeline Transportation</option>
                    </select>
                  </div>

                  {/* Established Year */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Year Established <span className="text-yellow-400">*</span></label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={formData.establishedYear}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* License Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Operating license"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Operations Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <MapPin size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Location & Operations</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Country */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Country <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g., Saudi Arabia"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Address <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Headquarters address"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Operating Area */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Operating Area <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="operatingArea"
                      value={formData.operatingArea}
                      onChange={handleInputChange}
                      placeholder="e.g., Middle East"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Total Employees */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Users size={16} /> Total Employees <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalEmployees"
                      value={formData.totalEmployees}
                      onChange={handleInputChange}
                      placeholder="e.g., 5000"
                      min="1"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Briefcase size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Contact Person */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Contact Designation */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Designation</label>
                    <input
                      type="text"
                      name="contactDesignation"
                      value={formData.contactDesignation}
                      onChange={handleInputChange}
                      placeholder="e.g., CEO"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Company Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Mail size={16} /> Email <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@email.com"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Phone size={16} /> Phone <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Login Credentials Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Lock size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Login Credentials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <User size={16} /> Username <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Zap size={16} /> Password <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Lock size={16} /> Confirm Password <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
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
                  {loading ? 'Registering...' : 'Register Company'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Companies Table */}
      <div className="bg-[#1e2130] rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
        {/* Table Header */}
        <div className="px-6 py-6 border-b border-gray-700/50 bg-gradient-to-r from-[#1e2130] to-[#252a38]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Registered Companies <span className="text-yellow-400 text-lg">({companies.length})</span></h2>
        </div>

        {/* Table */}
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
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-white font-semibold">{company.companyName}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 font-mono bg-gray-900/50">{company.registrationNumber}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{company.industryType}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{company.country}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{company.operatingArea}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 truncate">{company.email}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <span className="px-3 py-1.5 bg-green-900/30 text-green-300 rounded-full text-xs font-semibold border border-green-700/50">
                        {company.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCompany(company.id)}
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
import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Mail, User, Lock, Phone, MapPin, Briefcase, Users, UserCheck, AlertCircle, CheckCircle, Shield, Calendar } from 'lucide-react';

export default function CreateNewUser() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'Ahmed',
      lastName: 'Al-Rashid',
      email: 'ahmed.rashid@saudiaramco.com',
      phone: '+966 501234567',
      username: 'ahmed_rashid',
      role: 'Project Manager',
      company: 'Saudi Aramco Limited',
      department: 'Operations',
      status: 'Active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@shelloindia.com',
      phone: '+91 9876543210',
      username: 'priya_sharma',
      role: 'Technical Lead',
      company: 'Shell Oil India',
      department: 'Engineering',
      status: 'Active',
      joinDate: '2024-02-20'
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Employee',
    company: '',
    department: '',
    designation: '',
    address: '',
    city: '',
    country: ''
  });

  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const roles = ['Employee', 'Project Manager', 'Technical Lead', 'Supervisor', 'Administrator', 'Analyst'];
  const departments = ['Operations', 'Engineering', 'Finance', 'HR', 'IT', 'Sales', 'Logistics', 'Safety'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.username || !formData.password || !formData.role || !formData.company || !formData.department) {
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
    if (formData.password.length < 6) {
      setAlert({ show: true, message: 'Password must be at least 6 characters', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      const newUser = {
        id: users.length + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        role: formData.role,
        company: formData.company,
        department: formData.department,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      };

      setUsers([...users, newUser]);
      
      setAlert({
        show: true,
        message: `User created successfully! Welcome email sent to ${formData.email}`,
        type: 'success'
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'Employee',
        company: '',
        department: '',
        designation: '',
        address: '',
        city: '',
        country: ''
      });

      setShowForm(false);
      setLoading(false);

      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    }, 1500);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setAlert({ show: true, message: 'User deleted successfully', type: 'success' });
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Create and manage user accounts</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Create User</span>
          </button>
        )}
      </div>

      {/* Create User Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-4xl border border-gray-700/50 my-8">
            {/* Form Header */}
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-700/50 sticky top-0 bg-[#1e2130] rounded-t-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Create New User</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <User size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">First Name <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Last Name <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Mail size={16} /> Email <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="user@company.com"
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

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <MapPin size={16} /> Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Briefcase size={24} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Professional Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Company <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Select company"
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Department <span className="text-yellow-400">*</span></label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <Shield size={16} /> Role <span className="text-yellow-400">*</span>
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  {/* Designation */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Engineer"
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
                    <label className="block text-sm font-semibold text-gray-200">Username <span className="text-yellow-400">*</span></label>
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
                    <label className="block text-sm font-semibold text-gray-200">Password <span className="text-yellow-400">*</span></label>
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
                    <label className="block text-sm font-semibold text-gray-200">Confirm Password <span className="text-yellow-400">*</span></label>
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
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#1e2130] rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
        {/* Table Header */}
        <div className="px-6 py-6 border-b border-gray-700/50 bg-gradient-to-r from-[#1e2130] to-[#252a38]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Active Users <span className="text-yellow-400 text-lg">({users.length})</span></h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#16181f] border-b border-gray-700/50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-[#252a38] transition duration-200 group">
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-white font-semibold">{user.firstName} {user.lastName}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 font-mono bg-gray-900/50">{user.username}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 truncate">{user.email}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{user.company}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <span className="px-3 py-1.5 bg-blue-900/30 text-blue-300 rounded-full text-xs font-semibold border border-blue-700/50">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{user.department}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <span className="px-3 py-1.5 bg-green-900/30 text-green-300 rounded-full text-xs font-semibold border border-green-700/50 flex items-center gap-1 w-fit">
                        <UserCheck size={14} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
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
                      <Users size={48} className="text-gray-600" />
                      <p className="text-gray-400 text-sm sm:text-base">No users created yet</p>
                      <p className="text-gray-500 text-xs">Click "Create User" to add your first user</p>
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
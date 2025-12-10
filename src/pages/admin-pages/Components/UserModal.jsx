import React, { useState, useEffect } from 'react';
import { X, Mail, User, Lock, Phone, MapPin, Briefcase, Users, Shield } from 'lucide-react';
import useUserStore from "../store/userStore";

export default function UserModal({ isOpen, onClose, editingUser = null, onSuccess }) {
  const { addUser, updateUser } = useUserStore();

  const [loading, setLoading] = useState(false);

  const roles = ['Employee', 'Project Manager', 'Technical Lead', 'Supervisor', 'Administrator', 'Analyst'];
  const departments = ['Operations', 'Engineering', 'Finance', 'HR', 'IT', 'Sales', 'Logistics', 'Safety'];

  const initialFormData = {
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
    country: '',
    isSuperUser: false
  };

  const [formData, setFormData] = useState(initialFormData);

  // Reset form when modal opens/closes or editing user changes
  useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        setFormData({
          firstName: editingUser.firstName || '',
          lastName: editingUser.lastName || '',
          email: editingUser.email || '',
          phone: editingUser.phone || '',
          username: editingUser.username || '',
          password: '',
          confirmPassword: '',
          role: editingUser.role || 'Employee',
          company: editingUser.company || '',
          department: editingUser.department || '',
          designation: editingUser.designation || '',
          address: editingUser.address || '',
          city: editingUser.city || '',
          country: editingUser.country || '',
          isSuperUser: editingUser.isSuperUser || false
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [isOpen, editingUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (isEditing = false) => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'username', 'role', 'company', 'department'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      if (onSuccess) onSuccess('All required fields must be filled', 'error');
      return false;
    }

    if (!isEditing && (!formData.password || !formData.confirmPassword)) {
      if (onSuccess) onSuccess('Password fields are required for new users', 'error');
      return false;
    }

    if (!isEditing && formData.password !== formData.confirmPassword) {
      if (onSuccess) onSuccess('Passwords do not match', 'error');
      return false;
    }

    if (!isEditing && formData.password.length < 6) {
      if (onSuccess) onSuccess('Password must be at least 6 characters', 'error');
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

    const isEditing = !!editingUser;

    if (!validateForm(isEditing)) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const submissionData = { ...formData };

        if (isEditing) {
          // Remove password fields when editing
          delete submissionData.password;
          delete submissionData.confirmPassword;
          updateUser(editingUser.id, submissionData);
          if (onSuccess) onSuccess('User updated successfully!', 'success');
        } else {
          // For new user, include all data
          addUser(submissionData);
          if (onSuccess) onSuccess(`User created successfully! Welcome email sent to ${formData.email}`, 'success');
        }

        // Close modal after successful submission
        setTimeout(() => {
          onClose();
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Error saving user:', error);
        if (onSuccess) onSuccess('Error saving user data', 'error');
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
      'firstName', 'lastName', 'email', 'phone',
      'username', 'role', 'company', 'department'
    ];

    if (!editingUser) {
      required.push('password', 'confirmPassword');
    }

    return required.every(field => formData[field] && formData[field].toString().trim() !== '');
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e2130] rounded-2xl w-full max-w-6xl border border-gray-700/50 max-h-[90vh] flex flex-col">
        {/* Form Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50 sticky top-0 bg-[#1e2130] rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-white">
            {editingUser ? 'Edit User' : 'Create New User'}
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
          {/* Personal Information Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <User size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">First Name <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Last Name <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
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
                  placeholder="user@company.com"
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

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <MapPin size={14} /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Briefcase size={20} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Professional Information</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Company <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Select company"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Department <span className="text-yellow-400">*</span></label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <Shield size={14} /> Role <span className="text-yellow-400">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition appearance-none cursor-pointer"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Engineer"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              {/* Super User Toggle */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <Users size={14} /> Super User
                </label>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isSuperUser"
                      checked={formData.isSuperUser}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                  <span className="text-sm text-gray-300">
                    {formData.isSuperUser ? 'Super User Enabled' : 'Regular User'}
                  </span>
                </div>
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
                <label className="block text-sm font-semibold text-gray-200">Username <span className="text-yellow-400">*</span></label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="w-full px-3 py-2 bg-[#252a38] border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                />
              </div>

              {!editingUser && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">Password <span className="text-yellow-400">*</span></label>
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
                    <label className="block text-sm font-semibold text-gray-200">Confirm Password <span className="text-yellow-400">*</span></label>
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
                ? (editingUser ? 'Updating...' : 'Creating...')
                : (editingUser ? 'Update User' : 'Create User')
              }
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
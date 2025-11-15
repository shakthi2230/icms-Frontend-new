import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Users, UserCheck, Shield, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import useUserStore from "./store/userStore.jsx";
import UserModal from "./Components/UserModal.jsx";

export default function CreateNewUser() {
  const {
    users,
    deleteUser,
    toggleUserStatus,
    toggleSuperUser,
  } = useUserStore();

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleView = (user) => {
    setViewingUser(user);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      showAlert('User deleted successfully', 'success');
      setUserToDelete(null);
    }
  };

  const handleStatusToggle = (user) => {
    toggleUserStatus(user.id);
    showAlert(`User status changed to ${user.status === 'Active' ? 'Inactive' : 'Active'}`, 'success');
  };

  const handleSuperUserToggle = (user) => {
    toggleSuperUser(user.id);
    showAlert(`${user.firstName} ${user.lastName} ${user.isSuperUser ? 'removed from' : 'added to'} Super Users`, 'success');
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-900/30 text-green-300 border-green-700/50' 
      : 'bg-gray-700/30 text-gray-300 border-gray-600/50';
  };

  const getSuperUserColor = (isSuperUser) => {
    return isSuperUser 
      ? 'bg-purple-900/30 text-purple-300 border-purple-700/50' 
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

      {/* User Modal */}
      <UserModal 
        isOpen={showUserModal}
        onClose={handleCloseUserModal}
        editingUser={editingUser}
        onSuccess={(message, type) => showAlert(message, type)}
      />

      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400 text-sm sm:text-base">Create and manage user accounts</p>
        </div>
        <button
          onClick={handleCreateUser}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 transform hover:scale-105 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Create User</span>
        </button>
      </div>

      {/* View User Details Modal */}
      {viewingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl w-full max-w-2xl border border-gray-700/50">
            <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white">User Profile</h2>
              <button
                onClick={() => setViewingUser(null)}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-700/30 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <p className="text-white font-semibold">{viewingUser.firstName} {viewingUser.lastName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Username</label>
                  <p className="text-white font-mono">{viewingUser.username}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white">{viewingUser.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-white">{viewingUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Company</label>
                  <p className="text-white">{viewingUser.company}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Department</label>
                  <p className="text-white">{viewingUser.department}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Role</label>
                  <p className="text-white">{viewingUser.role}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Designation</label>
                  <p className="text-white">{viewingUser.designation || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(viewingUser.status)}`}>
                    {viewingUser.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Super User</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSuperUserColor(viewingUser.isSuperUser)}`}>
                    {viewingUser.isSuperUser ? 'Yes' : 'No'}
                  </span>
                </div>
                {viewingUser.address && (
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400">Address</label>
                    <p className="text-white">{viewingUser.address}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400">Join Date</label>
                  <p className="text-white flex items-center gap-1">
                    <Calendar size={14} />
                    {viewingUser.joinDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
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
                Are you sure you want to delete <strong>{userToDelete.firstName} {userToDelete.lastName}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setUserToDelete(null)}
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

      {/* Users Table */}
      <div className="bg-[#1e2130] rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl">
        <div className="px-6 py-6 border-b border-gray-700/50 bg-gradient-to-r from-[#1e2130] to-[#252a38]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Active Users <span className="text-yellow-400 text-lg">({users.length})</span>
          </h2>
        </div>
        

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
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Super User</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-[#252a38] transition duration-200 group">
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => handleView(user)}
                        className="text-xs sm:text-sm text-white font-semibold hover:text-yellow-400 transition text-left"
                      >
                        {user.firstName} {user.lastName}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 font-mono bg-gray-900/50">{user.username}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300 truncate max-w-[150px]">{user.email}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{user.company}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <span className="px-3 py-1.5 bg-blue-900/30 text-blue-300 rounded-full text-xs font-semibold border border-blue-700/50">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-300">{user.department}</td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <button
                        onClick={() => handleStatusToggle(user)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${getStatusColor(user.status)} hover:opacity-80 flex items-center gap-1`}
                      >
                        <UserCheck size={14} />
                        {user.status}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <button
                        onClick={() => handleSuperUserToggle(user)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${getSuperUserColor(user.isSuperUser)} hover:opacity-80 flex items-center gap-1`}
                      >
                        <Shield size={14} />
                        {user.isSuperUser ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button 
                          onClick={() => handleView(user)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition" 
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(user)}
                          className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition" 
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user)}
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
                  <td colSpan="9" className="px-4 sm:px-6 py-12 text-center">
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
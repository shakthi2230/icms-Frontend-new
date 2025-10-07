import React, { useState } from 'react';

// New Import Form Component
const NewImportForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    config: '',
    engRegister: '',
    cableName: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">New Import</h2>
                <p className="text-sm text-gray-600 mt-1">Create a new import configuration</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {/* Config Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Configuration
                </label>
                <select
                  name="config"
                  value={formData.config}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select config or version</option>
                  <option value="cables">Cables</option>
                  <option value="dummyTags">Dummy Tags</option>
                  <option value="electricalEquipment">Electrical Equipment</option>
                  <option value="fireAndGas">Fire and Gas</option>
                  <option value="functionBlocks">Function Blocks</option>
                  <option value="hvacCables">HVAC Cables</option>
                  <option value="instruments">Instruments</option>
                  <option value="junctionBoxes">Junction Boxes</option>
                  <option value="loops">Loops</option>
                  <option value="masterEquipment">Master Equipment</option>
                  <option value="pipingSpecialItems">Piping Special Items</option>
                  <option value="safety">Safety</option>
                  <option value="signals">Signals</option>
                  <option value="telecom">Telecom</option>
                  <option value="testPackageError">Test Package Error</option>
                  <option value="valves">Valves</option>
                </select>
              </div>

              {/* Engineering Register Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engineering Register *
                </label>
                <input
                  type="text"
                  name="engRegister"
                  value={formData.engRegister}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter engineering register"
                  required
                />
              </div>

              {/* Cable Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cable Name *
                </label>
                <select
                  name="cableName"
                  value={formData.cableName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select cable</option>
                  <option value="cable1">Cable 1</option>
                  <option value="cable2">Cable 2</option>
                  <option value="cable3">Cable 3</option>
                </select>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create Import
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Imports Reports Component
function ImportsReports() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'form'
  const [imports, setImports] = useState([]);
  const currentDateTime = '05:24 PM IST on Tuesday, October 07, 2025';

  const handleNewImport = () => {
    setCurrentView('form');
  };

  const handleCloseForm = () => {
    setCurrentView('list');
  };

  const handleSubmitForm = (formData) => {
    // Add the new import to the list
    const newImport = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    setImports(prev => [newImport, ...prev]);
  };

  // Show form view
  if (currentView === 'form') {
    return <NewImportForm onClose={handleCloseForm} onSubmit={handleSubmitForm} />;
  }

  // Show list view
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Imports Reports</h1>
          <p className="text-sm text-gray-600">Current Date and Time: {currentDateTime}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Import Operations</h2>
            <button
              onClick={handleNewImport}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              + New Import
            </button>
          </div>
          
          {/* Imports List */}
          {imports.length > 0 ? (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Config
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Eng Register
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cable
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {imports.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.config}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.engRegister}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.cableName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                        {item.description || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No imports</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new import.</p>
              <div className="mt-4">
                <button
                  onClick={handleNewImport}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  + New Import
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportsReports;
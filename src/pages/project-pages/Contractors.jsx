import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Edit2, Download, FileJson, AlertCircle, CheckCircle, Search, X } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function Contractors() {
  // Contractors List
  const [contractors, setContractors] = useState([
    { code: 'BUS', name: 'Busch, Norway', selected: false },
    { code: 'DHR', name: 'Chromalloy US - Seal Subz Bu', selected: false },
    { code: 'EAT', name: 'Eaglegramm - 55E System Subz Bu', selected: false },
    { code: 'EMO', name: 'Eling, Norway', selected: false },
    { code: 'ERR', name: 'Erreas/MRC Store Moment', selected: false },
    { code: 'FOG', name: 'Foyale/MO Steel Fabrik in UK, United', selected: false },
    { code: 'GOT', name: 'Goodw/MRC & Elko Service A', selected: true },
    { code: 'HNO', name: 'Honda, Germany', selected: false },
    { code: 'IHM', name: 'IBM HUS / Deliia/Triun Ball M', selected: false },
    { code: 'KVO', name: 'Kochne, Deliia/Triun Ball AS', selected: false },
  ]);

  // Members List
  const [members, setMembers] = useState([
    { id: 1, name: 'ahmed.fazil@binz.com', discipline: 'binz.fazil', enabled: true, autoSubscribe: false },
    { id: 2, name: 'john.smith@company.com', discipline: 'Engineering', enabled: true, autoSubscribe: true },
    { id: 3, name: 'sara.khan@ops.com', discipline: 'Operations', enabled: true, autoSubscribe: false },
    { id: 4, name: 'mike.johnson@eng.com', discipline: 'Technical', enabled: false, autoSubscribe: false },
    { id: 5, name: 'lisa.brown@admin.com', discipline: 'Administration', enabled: true, autoSubscribe: true },
  ]);

  // Filters and State
  const [searchContractID, setSearchContractID] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [searchContractNo, setSearchContractNo] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [newMember, setNewMember] = useState({ name: '', discipline: '', enabled: false, autoSubscribe: false });
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter members
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchName = member.name.toLowerCase().includes(searchContractID.toLowerCase());
      const matchDiscipline = member.discipline.toLowerCase().includes(searchDescription.toLowerCase());
      return matchName && matchDiscipline;
    });
  }, [members, searchContractID, searchDescription]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredMembers.slice(start, start + rowsPerPage);
  }, [filteredMembers, currentPage, rowsPerPage]);

  // Toggle contractor selection
  const toggleContractorSelect = (code) => {
    setContractors(contractors.map(c => 
      c.code === code ? { ...c, selected: !c.selected } : c
    ));
  };

  // Toggle all contractors
  const toggleAllContractors = () => {
    const allSelected = contractors.every(c => c.selected);
    setContractors(contractors.map(c => ({ ...c, selected: !allSelected })));
  };

  // Add new member
  const handleAddMember = () => {
    if (!newMember.name || !newMember.discipline) {
      setAlert({ show: true, message: 'Please fill all fields', type: 'error' });
      return;
    }
    
    setMembers([...members, { 
      id: Date.now(), 
      ...newMember 
    }]);
    
    setAlert({ show: true, message: 'Member added successfully', type: 'success' });
    setNewMember({ name: '', discipline: '', enabled: false, autoSubscribe: false });
    setShowAddForm(false);
    
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Update member
  const handleUpdateMember = (id, field, value) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  // Delete member
  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
    setAlert({ show: true, message: 'Member deleted successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredMembers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contractors');
    XLSX.writeFile(wb, `Contractors-${new Date().toISOString().split('T')[0]}.xlsx`);
    setAlert({ show: true, message: 'Data exported to Excel successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(31, 41, 55);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(251, 191, 36);
    doc.text('Contractors Report', 15, 18);
    
    // Table data
    const tableData = filteredMembers.map(m => [
      m.name,
      m.discipline,
      m.enabled ? 'Yes' : 'No',
      m.autoSubscribe ? 'Yes' : 'No'
    ]);

    doc.autoTable({
      startY: 35,
      head: [['Name', 'Discipline', 'Enabled', 'Auto Subscribe']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [251, 191, 36],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      bodyStyles: {
        textColor: [60, 60, 60]
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    doc.save(`Contractors-${new Date().toISOString().split('T')[0]}.pdf`);
    setAlert({ show: true, message: 'PDF exported successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(filteredMembers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Contractors-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    setAlert({ show: true, message: 'Data exported to JSON successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-[#0f111a] rounded-lg overflow-hidden border border-gray-700/50">
      {/* Alert */}
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
          <span className="text-sm">{alert.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 border-r border-gray-700/50 bg-[#1e2130] overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Search size={16} className="text-yellow-400" />
            Contractors List
          </h3>
          <button 
            onClick={toggleAllContractors}
            className="w-full text-xs mb-3 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
          >
            {contractors.every(c => c.selected) ? 'Deselect All' : 'Select All'}
          </button>
          <ul className="space-y-1">
            {contractors.map((item, index) => (
              <li 
                key={index} 
                onClick={() => toggleContractorSelect(item.code)}
                className={`p-2 rounded cursor-pointer transition ${item.selected ? 'bg-yellow-500/20 border border-yellow-500/50' : 'hover:bg-gray-700/30 border border-transparent'}`}
              >
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={item.selected} 
                    onChange={() => {}}
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" 
                  />
                  <span className="text-xs font-semibold text-white">{item.code}</span>
                  <span className="text-xs text-gray-400 flex-1 truncate">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Export Section */}
        <div className="p-4 border-t border-gray-700/50 mt-4 space-y-2">
          <h4 className="text-xs font-semibold text-gray-300 mb-3">Export Options</h4>
          <button 
            onClick={handleExportExcel}
            className="w-full text-xs text-black bg-green-500 hover:bg-green-600 p-2 rounded font-semibold transition flex items-center justify-center gap-2"
          >
            <Download size={14} /> Export Excel
          </button>
          <button 
            onClick={handleExportPDF}
            className="w-full text-xs text-black bg-red-500 hover:bg-red-600 p-2 rounded font-semibold transition flex items-center justify-center gap-2"
          >
            <Download size={14} /> Export PDF
          </button>
          <button 
            onClick={handleExportJSON}
            className="w-full text-xs text-black bg-blue-500 hover:bg-blue-600 p-2 rounded font-semibold transition flex items-center justify-center gap-2"
          >
            <FileJson size={14} /> Export JSON
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-700/50 bg-[#1e2130]">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Search by Name" 
                value={searchContractID}
                onChange={(e) => {
                  setSearchContractID(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-600/50 rounded-lg text-sm w-40 bg-[#252a38] text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <input 
                type="text" 
                placeholder="Search Discipline" 
                value={searchDescription}
                onChange={(e) => {
                  setSearchDescription(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-600/50 rounded-lg text-sm w-40 bg-[#252a38] text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(1)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition"
              >
                Search
              </button>
              <button 
                onClick={() => {
                  setSearchContractID('');
                  setSearchDescription('');
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg text-sm transition"
              >
                Clear
              </button>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="ml-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg text-sm transition flex items-center gap-2"
            >
              <Plus size={16} /> Add Member
            </button>
          </div>
        </div>

        {/* Add Member Form */}
        {showAddForm && (
          <div className="p-4 border-b border-gray-700/50 bg-[#252a38] space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white">Add New Member</h4>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input 
                type="email"
                placeholder="Email"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="px-3 py-2 border border-gray-600/50 rounded-lg text-sm bg-[#1e2130] text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <input 
                type="text"
                placeholder="Discipline"
                value={newMember.discipline}
                onChange={(e) => setNewMember({ ...newMember, discipline: e.target.value })}
                className="px-3 py-2 border border-gray-600/50 rounded-lg text-sm bg-[#1e2130] text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <div className="flex items-center space-x-3">
                <label className="text-sm text-gray-300 flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={newMember.enabled}
                    onChange={(e) => setNewMember({ ...newMember, enabled: e.target.checked })}
                    className="rounded border-gray-600 text-yellow-500"
                  />
                  Enabled
                </label>
                <label className="text-sm text-gray-300 flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={newMember.autoSubscribe}
                    onChange={(e) => setNewMember({ ...newMember, autoSubscribe: e.target.checked })}
                    className="rounded border-gray-600 text-yellow-500"
                  />
                  Auto Subscribe
                </label>
              </div>
              <button 
                onClick={handleAddMember}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition"
              >
                Add Member
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-700/50">
            <thead className="bg-[#16181f] sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Discipline</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Enabled</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Auto Subscribe</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {paginatedMembers.length > 0 ? (
                paginatedMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#252a38] transition">
                    <td className="px-4 py-3">
                      <input 
                        type="email"
                        value={member.name}
                        onChange={(e) => handleUpdateMember(member.id, 'name', e.target.value)}
                        className="px-2 py-1 border border-gray-600/50 rounded text-xs w-full bg-[#1e2130] text-white"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="text"
                        value={member.discipline}
                        onChange={(e) => handleUpdateMember(member.id, 'discipline', e.target.value)}
                        className="px-2 py-1 border border-gray-600/50 rounded text-xs w-full bg-[#1e2130] text-white"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox"
                        checked={member.enabled}
                        onChange={(e) => handleUpdateMember(member.id, 'enabled', e.target.checked)}
                        className="rounded border-gray-600 text-yellow-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox"
                        checked={member.autoSubscribe}
                        onChange={(e) => handleUpdateMember(member.id, 'autoSubscribe', e.target.checked)}
                        className="rounded border-gray-600 text-yellow-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                    No members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-700/50 bg-[#1e2130] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border border-gray-600/50 rounded-md text-xs bg-[#252a38] hover:bg-gray-700 text-white disabled:opacity-50"
            >
              ‹
            </button>
            <span className="text-xs text-gray-300">
              {filteredMembers.length === 0 ? '0' : (currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredMembers.length)} of {filteredMembers.length}
            </span>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border border-gray-600/50 rounded-md text-xs bg-[#252a38] hover:bg-gray-700 text-white disabled:opacity-50"
            >
              ›
            </button>
            <span className="text-xs text-gray-300">{currentPage} of {totalPages}</span>
            <select 
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-600/50 rounded-md text-xs ml-4 bg-[#252a38] text-white"
            >
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-xs text-gray-300">Rows per page</span>
          </div>
        </div>
      </div>
    </div>
  );
}
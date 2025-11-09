import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Edit2, Search, Save, X, AlertCircle, CheckCircle, Download, FileJson, ChevronUp, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function SystemStructure() {
  const [rows, setRows] = useState([
    { id: 1, title: 'Cables', engRegister: 'atv, ENG, Cables', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: true, typePop: true, tagImport: true, importMarkup: true, selected: true },
    { id: 2, title: 'Circuit Starters', engRegister: 'atv, ENG, CircuitStarter', validFor: 'All', manualInput: false, delete: false, rename: false, syntax: false, typePop: false, tagImport: false, importMarkup: false, selected: false },
    { id: 3, title: 'Dummy Tags', engRegister: 'atv, ENG, DummyTags', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { id: 4, title: 'Fire and Gas', engRegister: 'atv, ENG, FireGas', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: false, importMarkup: false, selected: false },
    { id: 5, title: 'Function Block', engRegister: 'atv, ENG, FunctionBlock', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: false, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { id: 6, title: 'HVAC Cables', engRegister: 'atv, ENG, HVACCables', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: false, typePop: true, tagImport: false, importMarkup: false, selected: false },
    { id: 7, title: 'Instruments', engRegister: 'atv, ENG, Instruments', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: true, typePop: true, tagImport: false, importMarkup: false, selected: false },
    { id: 8, title: 'Junction Boxes', engRegister: 'atv, ENG, JunctionBoxes', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: false, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { id: 9, title: 'Loops', engRegister: 'atv, ENG, Loops', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { id: 10, title: 'Master Equipment', engRegister: 'atv, ENG, MasterEquipment', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: true, typePop: false, tagImport: false, importMarkup: false, selected: false },
    { id: 11, title: 'Piping Safety Items', engRegister: 'atv, ENG, PipingSafetyItems', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { id: 12, title: 'Signals', engRegister: 'atv, ENG, Signals', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: true, typePop: true, tagImport: false, importMarkup: false, selected: false },
    { id: 13, title: 'Telecom', engRegister: 'atv, ENG, Telecom', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { id: 14, title: 'Testpacks', engRegister: 'atv, ENG, Testpacks', validFor: 'All', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: true, importMarkup: true, selected: false },
    { id: 15, title: 'Validation Errors', engRegister: 'atv, ENG, ValidationErrors', validFor: 'All', manualInput: true, delete: true, rename: true, syntax: false, typePop: true, tagImport: true, importMarkup: false, selected: false },
    { id: 16, title: 'Valves', engRegister: 'atv, ENG, Valves', validFor: 'All', manualInput: true, delete: false, rename: true, syntax: false, typePop: false, tagImport: true, importMarkup: false, selected: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRow, setNewRow] = useState({ title: '', engRegister: '', validFor: 'All', manualInput: false, delete: false, rename: false, syntax: false, typePop: false, tagImport: false, importMarkup: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter rows
  const filteredRows = useMemo(() => {
    return rows.filter(row =>
      row.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.engRegister.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  // Sort rows
  const sortedRows = useMemo(() => {
    const sorted = [...filteredRows].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  }, [filteredRows, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, currentPage, rowsPerPage]);

  // Handle sort
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Add new row
  const handleAddRow = () => {
    if (!newRow.title || !newRow.engRegister) {
      setAlert({ show: true, message: 'Title and Eng Register are required', type: 'error' });
      return;
    }

    setRows([...rows, { id: Date.now(), ...newRow }]);
    setAlert({ show: true, message: 'System structure added successfully', type: 'success' });
    setNewRow({ title: '', engRegister: '', validFor: 'All', manualInput: false, delete: false, rename: false, syntax: false, typePop: false, tagImport: false, importMarkup: false });
    setShowAddForm(false);
    setCurrentPage(1);
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Update row
  const handleUpdateRow = (id, field, value) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // Delete row
  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
    setAlert({ show: true, message: 'System structure deleted successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Toggle row selection
  const handleToggleSelect = (id) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, selected: !row.selected } : row
    ));
  };

  // Select all
  const handleSelectAll = () => {
    const allSelected = paginatedRows.every(r => r.selected);
    setRows(rows.map(row =>
      paginatedRows.find(pr => pr.id === row.id) ? { ...row, selected: !allSelected } : row
    ));
  };

  // Export to Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'System Structure');
    XLSX.writeFile(wb, `SystemStructure-${new Date().toISOString().split('T')[0]}.xlsx`);
    setAlert({ show: true, message: 'Exported to Excel successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFillColor(251, 191, 36);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('System Structure Report', 15, 13);

    const tableData = sortedRows.map(row => [
      row.title,
      row.engRegister,
      row.validFor,
      row.manualInput ? 'Yes' : 'No',
      row.delete ? 'Yes' : 'No',
      row.rename ? 'Yes' : 'No',
      row.syntax ? 'Yes' : 'No',
      row.typePop ? 'Yes' : 'No',
      row.tagImport ? 'Yes' : 'No',
      row.importMarkup ? 'Yes' : 'No',
    ]);

    doc.autoTable({
      startY: 25,
      head: [['Title', 'Eng Register', 'Valid For', 'Manual Input', 'Delete', 'Rename', 'Syntax', 'Type Pop', 'Tag Import', 'Import Markup']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [15, 17, 26],
        textColor: [251, 191, 36],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        textColor: [60, 60, 60],
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: 15
    });

    doc.save(`SystemStructure-${new Date().toISOString().split('T')[0]}.pdf`);
    setAlert({ show: true, message: 'PDF exported successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(sortedRows, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SystemStructure-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    setAlert({ show: true, message: 'JSON exported successfully', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const SortableHeader = ({ column, label }) => (
    <th
      onClick={() => handleSort(column)}
      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-100 border-b border-gray-200 cursor-pointer hover:bg-gray-200 transition group whitespace-nowrap"
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition">
          <ChevronUp size={12} className={sortBy === column && sortOrder === 'asc' ? 'text-yellow-500' : 'text-gray-400'} />
          <ChevronDown size={12} className={sortBy === column && sortOrder === 'desc' ? 'text-yellow-500' : 'text-gray-400'} />
        </div>
      </div>
    </th>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#0f111a]">
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

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">System Structure</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage system structures and configurations</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add Structure</span>
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New System Structure</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Cables"
                    value={newRow.title}
                    onChange={(e) => setNewRow({ ...newRow, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Eng Register <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., atv, ENG, Cables"
                    value={newRow.engRegister}
                    onChange={(e) => setNewRow({ ...newRow, engRegister: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['manualInput', 'delete', 'rename', 'syntax', 'typePop', 'tagImport', 'importMarkup'].map(field => (
                  <label key={field} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={newRow[field]}
                      onChange={(e) => setNewRow({ ...newRow, [field]: e.target.checked })}
                      className="w-4 h-4 text-yellow-500 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button onClick={() => setShowAddForm(false)} className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleAddRow} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
                Add Structure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Export */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Search</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or Eng Register..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition text-sm">
              <Download size={16} /> Excel
            </button>
            <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm">
              <Download size={16} /> PDF
            </button>
            <button onClick={handleExportJSON} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition text-sm">
              <FileJson size={16} /> JSON
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginatedRows.length > 0 && paginatedRows.every(r => r.selected)}
                    className="w-4 h-4 text-yellow-500 rounded border-gray-300"
                  />
                </th>
                <SortableHeader column="title" label="Title" />
                <SortableHeader column="engRegister" label="Eng Register" />
                <SortableHeader column="validFor" label="Valid For" />
                <SortableHeader column="manualInput" label="Manual Input" />
                <SortableHeader column="delete" label="Delete" />
                <SortableHeader column="rename" label="Rename" />
                <SortableHeader column="syntax" label="Syntax" />
                <SortableHeader column="typePop" label="Type Pop" />
                <SortableHeader column="tagImport" label="Tag Import" />
                <SortableHeader column="importMarkup" label="Import Markup" />
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-100 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRows.length > 0 ? (
                paginatedRows.map(row => (
                  <tr key={row.id} className={`hover:bg-gray-50 transition ${row.selected ? 'bg-yellow-50' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleToggleSelect(row.id)}
                        className="w-4 h-4 text-yellow-500 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">{row.engRegister}</td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={row.validFor}
                        onChange={(e) => handleUpdateRow(row.id, 'validFor', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                      >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.manualInput} onChange={(e) => handleUpdateRow(row.id, 'manualInput', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.delete} onChange={(e) => handleUpdateRow(row.id, 'delete', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.rename} onChange={(e) => handleUpdateRow(row.id, 'rename', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.syntax} onChange={(e) => handleUpdateRow(row.id, 'syntax', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.typePop} onChange={(e) => handleUpdateRow(row.id, 'typePop', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.tagImport} onChange={(e) => handleUpdateRow(row.id, 'tagImport', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4"><input type="checkbox" checked={row.importMarkup} onChange={(e) => handleUpdateRow(row.id, 'importMarkup', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" /></td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDeleteRow(row.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-6 py-12 text-center">
                    <Search size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No structures found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-semibold">{sortedRows.length === 0 ? '0' : (currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * rowsPerPage, sortedRows.length)}</span> of <span className="font-semibold">{sortedRows.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 transition">
              ←
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg font-medium transition ${
                      currentPage === pageNum ? 'bg-yellow-500 text-black' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 transition">
              →
            </button>

            <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 ml-4">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef } from 'react';
import { Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function CheckListandCertificates() {
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const tableRef = useRef(null);

  const [data] = useState([
    { id: 'CQR-01', desc: 'Consumers Safety Valves', header: 'Commissioning Phase 1', rev: '01', phase: '▼', disc: 'CQ', eng: 'E', template: 'Single Tag Checklist', hrs: '6', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'CQR-03', desc: 'Safety Relief Valves', header: 'Commissioning Phase 1', rev: '02', phase: '▼', disc: 'CP', eng: 'I', template: 'Single Tag Checklist', hrs: '4', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'CQR-01', desc: 'Area Completion Record', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'Z', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'CQR-03', desc: 'IEC Ex Class Check Record', header: 'Commissioning Preparation', rev: '01', phase: '▼', disc: 'MC', eng: 'Z', template: 'Master Tag Checklist', hrs: '4', ch1: 'OK', ch2: 'OK', ch3: 'NA' },
    { id: 'MCR-02', desc: 'Architectural Equipment', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'C', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-01', desc: 'Electrical Installation', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-02', desc: 'Switchgear/Distribution Board/Cube/Breaker', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-03', desc: 'Electrical Rotating Machinery', header: 'Mechanical Completion Check', rev: '01', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'OK', ch3: 'NA' },
    { id: 'MCR-04', desc: 'Transformers Rectifiers Inverters UPS Freq', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-05', desc: 'LV Electrical Cables', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Cables', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-06', desc: 'Trace Heating-A Test', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-07', desc: 'EIT Area Check -B (after EIT Check)', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'Est Hrs', ch2: 'OK', ch3: 'Item' },
    { id: 'MCR-08', desc: 'Trace Heating-B Test (after installation)', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'H', template: 'Single Tag Checklist', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-01', desc: 'Instrument Installation', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Instruments', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-01B', desc: 'Instrument Installation', header: 'Mechanical Completion Check', rev: '01', phase: '▼', disc: 'MC', eng: 'I', template: 'Single Instruments', hrs: '', ch1: 'OK', ch2: 'OK', ch3: 'NA' },
    { id: 'MCR-02', desc: 'Control Panel', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'i', template: 'Instruments', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-03', desc: 'Fire & Gas Equipment Test (instrument / MEG)', header: 'Mechanical Completion Check', rev: 'A', phase: '▼', disc: 'MC', eng: 'I', template: 'Fire and Gas', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-04B', desc: 'Level 1 - Early Loop Test (Instrument)', header: 'Mechanical Completion Check', rev: 'A', phase: '▼', disc: 'MC', eng: 'I', template: 'Instruments', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-05', desc: 'Instrument Tubing Test and Cleaning', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Master Tag Checklist', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-06', desc: 'Instrument Junction Boxes', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Cables', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-07', desc: 'Junction Boxes', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-08', desc: 'System Integration Test', header: 'Commissioning Phase 2', rev: '03', phase: '▼', disc: 'SIT', eng: 'E', template: 'Master Tag Checklist', hrs: '8', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-09', desc: 'Final Verification Report', header: 'Final Handover', rev: '01', phase: '▼', disc: 'FH', eng: 'Z', template: 'Single Tag Checklist', hrs: '4', ch1: 'OK', ch2: 'OK', ch3: 'NA' },
    { id: 'MCR-10', desc: 'Safety Documentation', header: 'Safety Certification', rev: '02', phase: '▼', disc: 'SC', eng: 'E', template: 'Safety Checklist', hrs: '3', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
    { id: 'MCR-11', desc: 'Quality Assurance Check', header: 'QA Review Phase', rev: '01', phase: '▼', disc: 'QA', eng: 'I', template: 'QA Template', hrs: '5', ch1: 'OK', ch2: 'PL', ch3: 'NA' },
  ]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedData = data.slice(startIdx, endIdx);

  const handleSelectAll = () => {
    const newSelected = {};
    if (!selectAll) {
      data.forEach((_, idx) => {
        newSelected[idx] = true;
      });
    }
    setSelectedRows(newSelected);
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (idx) => {
    const newSelected = { ...selectedRows };
    if (newSelected[startIdx + idx]) {
      delete newSelected[startIdx + idx];
    } else {
      newSelected[startIdx + idx] = true;
    }
    setSelectedRows(newSelected);
  };

  const getSelectedData = () => {
    return data.filter((_, idx) => selectedRows[idx]);
  };

  const generatePDF = () => {
    const selectedData = getSelectedData();
    if (selectedData.length === 0) {
      setAlert({ show: true, message: 'Please select at least one record to export', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
      return;
    }

    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #1f2937;
            background: white;
            padding: 20px;
          }
          .header {
            background-color: #f3f4f6;
            border-bottom: 3px solid #1f2937;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
          }
          .header h1 {
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 5px;
          }
          .header p {
            color: #6b7280;
            font-size: 12px;
          }
          .meta-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
            background: #f9fafb;
            padding: 15px;
            border-radius: 4px;
          }
          .meta-item {
            border-left: 3px solid #d1d5db;
            padding-left: 10px;
          }
          .meta-label {
            font-size: 11px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
          }
          .meta-value {
            font-size: 13px;
            color: #1f2937;
            font-weight: 500;
            margin-top: 3px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          thead {
            background-color: #e5e7eb;
          }
          th {
            background-color: #d1d5db;
            color: #1f2937;
            padding: 10px 8px;
            text-align: left;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid #9ca3af;
          }
          td {
            padding: 8px;
            border: 1px solid #e5e7eb;
            font-size: 11px;
            color: #374151;
          }
          tbody tr:nth-child(even) {
            background-color: #f9fafb;
          }
          tbody tr:nth-child(odd) {
            background-color: #fff;
          }
          .status-ok {
            background-color: #dcfce7;
            color: #166534;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: 500;
          }
          .status-pl {
            background-color: #fef3c7;
            color: #92400e;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: 500;
          }
          .status-na {
            background-color: #f3f4f6;
            color: #6b7280;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: 500;
          }
          .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            font-size: 11px;
            color: #9ca3af;
          }
          .summary {
            background: #f0f9ff;
            border-left: 4px solid #0284c7;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .summary h3 {
            color: #0c4a6e;
            font-size: 12px;
            margin-bottom: 8px;
          }
          .summary p {
            color: #0369a1;
            font-size: 11px;
            line-height: 1.5;
          }
          @media print {
            body { padding: 0; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Checklist & Certificates Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>

        <div class="meta-info">
          <div class="meta-item">
            <div class="meta-label">Total Records Selected</div>
            <div class="meta-value">${selectedData.length}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Report Type</div>
            <div class="meta-value">Checklist & Certificates</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Report Period</div>
            <div class="meta-value">${new Date().getFullYear()}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Status</div>
            <div class="meta-value">Active Records</div>
          </div>
        </div>

        <div class="summary">
          <h3>Report Summary</h3>
          <p>This report contains ${selectedData.length} selected checklist and certificate records with their complete information including ID, description, headers, revisions, disciplines, and status details.</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Cert ID</th>
              <th>Description</th>
              <th>Header</th>
              <th>Rev</th>
              <th>Phase</th>
              <th>Disc</th>
              <th>Eng Register</th>
              <th>Report Template</th>
              <th>Est Hrs</th>
              <th>Check 1</th>
              <th>Check 2</th>
              <th>Check 3</th>
            </tr>
          </thead>
          <tbody>
            ${selectedData.map((row, idx) => `
              <tr>
                <td><strong>${row.id}</strong></td>
                <td>${row.desc}</td>
                <td>${row.header}</td>
                <td>${row.rev}</td>
                <td>${row.phase}</td>
                <td>${row.disc}</td>
                <td>${row.eng}</td>
                <td>${row.template}</td>
                <td>${row.hrs || '-'}</td>
                <td><span class="status-${row.ch1.toLowerCase().replace(' ', '-')}">${row.ch1}</span></td>
                <td><span class="status-${row.ch2.toLowerCase().replace(' ', '-')}">${row.ch2}</span></td>
                <td><span class="status-${row.ch3.toLowerCase().replace(' ', '-')}">${row.ch3}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>This is a confidential document. Records Selected: ${selectedData.length} | Total Available: ${data.length}</p>
          <p style="margin-top: 10px;">For more information, contact your project administrator.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow.print();
        URL.revokeObjectURL(url);
        document.body.removeChild(iframe);
        
        setAlert({
          show: true,
          message: `${selectedData.length} record(s) ready to export. Use browser print dialog to save as PDF.`,
          type: 'success'
        });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
      }, 500);
    };
  };

  const exportToExcel = () => {
    const selectedData = getSelectedData();
    if (selectedData.length === 0) {
      setAlert({ show: true, message: 'Please select at least one record to export', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
      return;
    }

    const headers = ['Cert ID', 'Description', 'Header', 'Rev', 'Phase', 'Disc', 'Eng Register', 'Report Template', 'Est Hrs', 'Check 1', 'Check 2', 'Check 3'];
    const rows = selectedData.map(row => [
      row.id, row.desc, row.header, row.rev, row.phase, row.disc, row.eng, row.template, row.hrs || '', row.ch1, row.ch2, row.ch3
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CheckList-Certificates-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setAlert({
      show: true,
      message: `${selectedData.length} record(s) exported to Excel successfully`,
      type: 'success'
    });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Alert */}
      {alert.show && (
        <div className={`absolute top-4 right-4 rounded-lg p-4 flex items-center gap-3 z-50 max-w-md border ${
          alert.type === 'success' 
            ? 'bg-green-50 text-green-800 border-green-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {alert.type === 'success' ? (
            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          )}
          <span className="text-sm">{alert.message}</span>
        </div>
      )}

      {/* Table */}
      <div className="flex flex-col w-full">
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200" ref={tableRef}>
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="divide-x divide-gray-200">
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6">
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                  />
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cert ID</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rev</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid For Phase</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disc</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eng Register</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Template</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est Hrs</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Header 1</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Item Header 2</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Item Header 3</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-50 divide-x divide-gray-200 ${selectedRows[startIdx + idx] ? 'bg-blue-50' : ''}`}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={!!selectedRows[startIdx + idx]}
                      onChange={() => handleSelectRow(idx)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                    />
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{row.id}</td>
                  <td className="px-2 py-2 text-xs text-gray-900 max-w-32 truncate">{row.desc}</td>
                  <td className="px-2 py-2 text-xs text-gray-900 max-w-40 truncate">{row.header}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.rev}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.phase}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.disc}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.eng}</td>
                  <td className="px-2 py-2 text-xs text-gray-900 max-w-24 truncate">{row.template}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.hrs || '-'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.ch1}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.ch2}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">{row.ch3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-3 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-200 bg-gray-50 text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Rows per page:</span>
            <select 
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white hover:bg-gray-50"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="text-gray-700">
            <p>Showing <span className="font-medium">{startIdx + 1}</span> to <span className="font-medium">{Math.min(endIdx, data.length)}</span> of <span className="font-medium">{data.length}</span> results | Selected: <span className="font-medium text-blue-600">{Object.keys(selectedRows).length}</span></p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-xs bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 border border-gray-300 rounded text-xs bg-white text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-xs bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={generatePDF}
              className="px-3 py-1 border border-red-300 rounded text-xs bg-red-50 text-red-700 hover:bg-red-100 flex items-center gap-1"
            >
              <Download size={14} /> Export PDF
            </button>
            <button 
              onClick={exportToExcel}
              className="px-3 py-1 border border-green-300 rounded text-xs bg-green-50 text-green-700 hover:bg-green-100 flex items-center gap-1"
            >
              <Download size={14} /> Export Excel
            </button>
            <button 
              className="px-3 py-1 border border-blue-300 rounded text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
            >
              <FileText size={14} /> Record Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
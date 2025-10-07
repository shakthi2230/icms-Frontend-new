import React from 'react';

function CheckLists() {
  const columns = [
    'Checklist Status',
    'Checklist Search',
    'Project Sub Checklist',
    'Show All',
    'Checklist No',
    'Checklist Description',
    'Type',
    'Category',
    'Sub Category',
    'Phase',
    'Responsible',
    'Reference No',
    'Site',
    'Package',
    'Revision',
    'Remarks',
    'Completed',
    'Completed By',
    'Approved',
    'Approved By',
    'Reviewed',
    'Review Date'
  ];

  const data = [
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1001', description: 'Mechanical Completion Checklist', type: 'M', category: 'A', subCategory: '▼', phase: 'MC', responsible: 'SUL', referenceNo: 'REF-001', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Initial mechanical check', completed: '04/09/2024', completedBy: 'John D', approved: '04/09/2024', approvedBy: 'Mike R', reviewed: '04/09/2024', reviewDate: 'John D' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1002', description: 'Electrical Installation Checklist', type: 'E', category: 'B', subCategory: '▼', phase: 'EI', responsible: 'NOV', referenceNo: 'REF-002', site: '▼', package: '▼', revision: 'Rev 2', remarks: 'Electrical system verification', completed: '04/09/2024', completedBy: 'Sarah M', approved: '04/09/2024', approvedBy: 'Tom B', reviewed: '04/09/2024', reviewDate: 'Sarah M' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1003', description: 'Instrumentation Calibration', type: 'I', category: 'C', subCategory: '▼', phase: 'IC', responsible: 'MHI', referenceNo: 'REF-003', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Instrument calibration records', completed: '04/09/2024', completedBy: 'Alex K', approved: '04/09/2024', approvedBy: 'Lisa P', reviewed: '04/09/2024', reviewDate: 'Alex K' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1004', description: 'Safety System Test', type: 'S', category: 'D', subCategory: '▼', phase: 'ST', responsible: 'BUS', referenceNo: 'REF-004', site: '▼', package: '▼', revision: 'Rev 3', remarks: 'Emergency shutdown test', completed: '04/09/2024', completedBy: 'David L', approved: '04/09/2024', approvedBy: 'Emma W', reviewed: '04/09/2024', reviewDate: 'David L' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1005', description: 'Piping Pressure Test', type: 'P', category: 'A', subCategory: '▼', phase: 'PT', responsible: 'GRV', referenceNo: 'REF-005', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Hydrostatic pressure test', completed: '04/09/2024', completedBy: 'Robert F', approved: '04/09/2024', approvedBy: 'Nancy G', reviewed: '04/09/2024', reviewDate: 'Robert F' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1006', description: 'Control Panel Inspection', type: 'E', category: 'B', subCategory: '▼', phase: 'CI', responsible: 'NYM', referenceNo: 'REF-006', site: '▼', package: '▼', revision: 'Rev 2', remarks: 'Control system verification', completed: '04/09/2024', completedBy: 'Kevin T', approved: '04/09/2024', approvedBy: 'Olivia M', reviewed: '04/09/2024', reviewDate: 'Kevin T' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1007', description: 'Fire Protection System', type: 'F', category: 'D', subCategory: '▼', phase: 'FP', responsible: 'SUL', referenceNo: 'REF-007', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Fire system compliance check', completed: '04/09/2024', completedBy: 'Brian S', approved: '04/09/2024', approvedBy: 'Sophia L', reviewed: '04/09/2024', reviewDate: 'Brian S' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1008', description: 'Commissioning Protocol', type: 'C', category: 'A', subCategory: '▼', phase: 'COM', responsible: 'NOV', referenceNo: 'REF-008', site: '▼', package: '▼', revision: 'Rev 4', remarks: 'Final commissioning document', completed: '04/09/2024', completedBy: 'George H', approved: '04/09/2024', approvedBy: 'Amanda R', reviewed: '04/09/2024', reviewDate: 'George H' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1009', description: 'Structural Integrity Check', type: 'S', category: 'C', subCategory: '▼', phase: 'SI', responsible: 'MHI', referenceNo: 'REF-009', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Structural component inspection', completed: '04/09/2024', completedBy: 'Henry W', approved: '04/09/2024', approvedBy: 'Jessica B', reviewed: '04/09/2024', reviewDate: 'Henry W' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1010', description: 'HVAC System Verification', type: 'H', category: 'B', subCategory: '▼', phase: 'HV', responsible: 'BUS', referenceNo: 'REF-010', site: '▼', package: '▼', revision: 'Rev 2', remarks: 'Ventilation system check', completed: '04/09/2024', completedBy: 'Paul M', approved: '04/09/2024', approvedBy: 'Megan K', reviewed: '04/09/2024', reviewDate: 'Paul M' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1011', description: 'Communication System Test', type: 'T', category: 'D', subCategory: '▼', phase: 'CT', responsible: 'GRV', referenceNo: 'REF-011', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Network connectivity test', completed: '04/09/2024', completedBy: 'Steven R', approved: '04/09/2024', approvedBy: 'Rachel L', reviewed: '04/09/2024', reviewDate: 'Steven R' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1012', description: 'Environmental Compliance', type: 'E', category: 'A', subCategory: '▼', phase: 'EC', responsible: 'NYM', referenceNo: 'REF-012', site: '▼', package: '▼', revision: 'Rev 3', remarks: 'Environmental regulation check', completed: '04/09/2024', completedBy: 'Daniel P', approved: '04/09/2024', approvedBy: 'Michelle S', reviewed: '04/09/2024', reviewDate: 'Daniel P' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1013', description: 'Quality Assurance Audit', type: 'Q', category: 'C', subCategory: '▼', phase: 'QA', responsible: 'SUL', referenceNo: 'REF-013', site: '▼', package: '▼', revision: 'Rev 2', remarks: 'Quality management system', completed: '04/09/2024', completedBy: 'Eric J', approved: '04/09/2024', approvedBy: 'Victoria H', reviewed: '04/09/2024', reviewDate: 'Eric J' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1014', description: 'Documentation Review', type: 'D', category: 'B', subCategory: '▼', phase: 'DR', responsible: 'NOV', referenceNo: 'REF-014', site: '▼', package: '▼', revision: 'Rev 1', remarks: 'Project documentation check', completed: '04/09/2024', completedBy: 'Christopher M', approved: '04/09/2024', approvedBy: 'Patricia W', reviewed: '04/09/2024', reviewDate: 'Christopher M' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', checklistNo: 'CHK-1015', description: 'Final Handover Checklist', type: 'F', category: 'A', subCategory: '▼', phase: 'FH', responsible: 'MHI', referenceNo: 'REF-015', site: '▼', package: '▼', revision: 'Rev 5', remarks: 'Project completion handover', completed: '04/09/2024', completedBy: 'Andrew T', approved: '04/09/2024', approvedBy: 'Samantha R', reviewed: '04/09/2024', reviewDate: 'Andrew T' },
  ];

  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs flex flex-col">
      {/* Table Container with Scroll */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="divide-x divide-gray-200">
              {columns.map((col, index) => (
                <th key={index} className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  {col}
                  {col.includes('▼') ? ' ▼' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 divide-x divide-gray-200">
                <td className="px-1 py-1 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.checked}
                    className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-1 py-5 whitespace-nowrap text-gray-900">{row.status}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.search}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.project}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.showAll}</td>
                <td className="px-1 py-1 whitespace-nowrap font-medium text-gray-900">{row.checklistNo}</td>
                <td className="px-1 py-1 text-gray-900 max-w-xs truncate">{row.description}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.type}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.category}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.subCategory}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.phase}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.responsible}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.referenceNo}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.site}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.package}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.revision}</td>
                <td className="px-1 py-1 text-gray-900 max-w-xs truncate">{row.remarks}</td>
                <td className="px-1 py-1 whitespace-nowrap text-green-600 font-medium">{row.completed}</td>
                <td className="px-1 py-1 text-gray-900">{row.completedBy}</td>
                <td className="px-1 py-1 whitespace-nowrap text-green-600 font-medium">{row.approved}</td>
                <td className="px-1 py-1 text-gray-900">{row.approvedBy}</td>
                <td className="px-1 py-1 whitespace-nowrap text-green-600 font-medium">{row.reviewed}</td>
                <td className="px-1 py-1 text-gray-900">{row.reviewDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Fixed at bottom */}
      <div className="px-2 py-1 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-1 text-gray-700">
          <button className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-100">‹</button>
          <span>1-15 of 215</span>
          <button className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-100">›</button>
        </div>
        <div className="flex items-center space-x-1 text-gray-700">
          <span>▼</span>
          <span>1 of 1</span>
          <span className="ml-1">▼</span>
        </div>
      </div>
    </div>
  );
}

export default CheckLists;
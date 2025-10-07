import React from 'react';

function PunchItems() {
  const columns = [
    'Punch Status',
    'Punch Search',
    'Project Sub Punch',
    'Show All',
    'Common Tag No',
    'Tag Description',
    'Disc',
    'Cat',
    'Sub Cat',
    'Phase',
    'Action By',
    'RFI No',
    'Site',
    'Package',
    'Checklist',
    'Description',
    'Cleared',
    'Cleared By',
    'Verified',
    'Verified By',
    'Checked',
    'Checked Out Date'
  ];

  const data = [
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1004', description: 'FG Separator Recycle', disc: 'Q', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'SUL', rfiNo: 'SUL', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'FG Separator Recycle', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1005', description: 'FG Separator Recycle', disc: 'Q', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'SUL', rfiNo: 'SUL', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'FG Separator Recycle', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1006', description: 'Gate Valve (Open/Closed) From PA-3A', disc: 'A', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'SUL', rfiNo: 'SUL', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Final', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1007', description: 'Gate Valve (Closed) On PA-3A', disc: 'A', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'SUL', rfiNo: 'SUL', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Final', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1008', description: 'MEMG Cable On Skid', disc: 'I', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NOV', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'NO', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1009', description: 'Wellhead Gate Valve On Line', disc: 'A', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'MHI', rfiNo: 'MHI', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Added Punch After Item 60', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1010', description: 'Wellhead Gate Valve On Line', disc: 'A', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'MHI', rfiNo: 'MHI', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Added Punch After Item 60', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1011', description: 'Pump Valve (Open/Closed) From PA-4', disc: 'Z', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'SUL', rfiNo: 'SUL', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Final', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1012', description: 'Vacuum Surge Drum', disc: 'R', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'BUS', rfiNo: 'BUS', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Supply Transmitter Pressure Gauge', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1013', description: 'Vacuum Surge Drum', disc: 'L', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'SUL', rfiNo: 'SUL', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Provide Nozzle For Sight Glass', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1014', description: 'Vacuum Surge Drum', disc: 'N', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'BUS', rfiNo: 'BUS', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'MOD Nozzle For Sight Glass', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1015', description: 'Needle Valve On 1" Manifold', disc: 'L', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'BUS', rfiNo: 'BUS', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'To Suit', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1016', description: 'COP Tag, 48" Modular Valve', disc: 'R', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'GRV', rfiNo: 'GRV', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'CE Tag, 48" Modular Valve', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1017', description: 'Butterfly Valve On Firewater Supply', disc: 'L', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NOV', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Ref', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1018', description: '#14C TB3. Oil Centre. LTB3 From G', disc: 'R', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'MHI', rfiNo: 'MHI', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Drain Not Tested Yet', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1019', description: 'MEG Hose A-1001', disc: 'R', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NOV', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-01', desc: 'Not Installed Yet', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1020', description: 'Heated MEG Hose A-1001', disc: 'R', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NYM', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Complete With Tag IEC Class', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1021', description: 'Mud Gas Separator', disc: 'R', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NYM', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Earth With Tag IEC Class', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1022', description: 'Flare Header 24"-1001', disc: 'A', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NYM', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Harness From Structure', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1023', description: 'Ball Valve Open In Line 14A', disc: 'L', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NYM', rfiNo: 'NOV', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Tag Not On Valve', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
    { checked: true, status: '▼', search: 'VAHAL', project: 'VAHAL', showAll: '▼', tagNo: 'SAF-1024', description: 'Ball Valve Open In Main', disc: 'L', cat: 'A', subCat: '▼', phase: 'MC', actionBy: 'NYM', rfiNo: 'NYM', site: '▼', package: '▼', checklist: 'MCR-02', desc: 'Tag Not On Valve', cleared: '04/09/2024', clearedBy: 'Plamen G', verified: '04/09/2024', verifiedBy: 'Plamen G', checked: '04/09/2024', checkedOut: 'Plamen G' },
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
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.status}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.search}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.project}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.showAll}</td>
                <td className="px-1 py-1 whitespace-nowrap font-medium text-gray-900">{row.tagNo}</td>
                <td className="px-1 py-1 text-gray-900 max-w-xs truncate">{row.description}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.disc}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.cat}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.subCat}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.phase}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.actionBy}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.rfiNo}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.site}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.package}</td>
                <td className="px-1 py-1 whitespace-nowrap text-gray-900">{row.checklist}</td>
                <td className="px-1 py-1 text-gray-900 max-w-xs truncate">{row.desc}</td>
                <td className="px-1 py-1 whitespace-nowrap text-green-600 font-medium">{row.cleared}</td>
                <td className="px-1 py-1 text-gray-900">{row.clearedBy}</td>
                <td className="px-1 py-1 whitespace-nowrap text-green-600 font-medium">{row.verified}</td>
                <td className="px-1 py-1 text-gray-900">{row.verifiedBy}</td>
                <td className="px-1 py-1 whitespace-nowrap text-green-600 font-medium">{row.checked}</td>
                <td className="px-1 py-1 text-gray-900">{row.checkedOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Fixed at bottom */}
      <div className="px-2 py-1 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-1 text-gray-700">
          <button className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-100">‹</button>
          <span>1-42 of 642</span>
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

export default PunchItems;
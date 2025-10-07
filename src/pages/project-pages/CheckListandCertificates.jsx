import React from 'react';

function CheckListandCertificates() {
  const data = [
    { id: 'CQR-01', desc: 'Consumers Safety Valves', header: 'Commissioning Phase 1', rev: '01', phase: '▼', disc: 'CQ', eng: 'E', template: 'Single Tag Checklist', hrs: '6', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: true },
    { id: 'CQR-03', desc: 'Safety Relief Valves', header: 'Commissioning Phase 1', rev: '02', phase: '▼', disc: 'CP', eng: 'I', template: 'Single Tag Checklist', hrs: '4', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'CQR-01', desc: 'Area Completion Record', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'Z', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'CQR-03', desc: 'IEC Ex Class Check Record', header: 'Commissioning Preparation', rev: '01', phase: '▼', disc: 'MC', eng: 'Z', template: 'Master Tag Checklist', hrs: '4', ch1: 'OK', ch2: 'OK', ch3: 'NA', checked: true },
    { id: 'MCR-02', desc: 'Architectural Equipment', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'C', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-01', desc: 'Electrical Installation', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-02', desc: 'Switchgear/Distribution Board/Cube/Breaker', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-03', desc: 'Electrical Rotating Machinery', header: 'Mechanical Completion Check', rev: '01', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'OK', ch3: 'NA', checked: false },
    { id: 'MCR-04', desc: 'Transformers Rectifiers Inverters UPS Freq', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: true },
    { id: 'MCR-05', desc: 'LV Electrical Cables', header: 'Mechanical Completion Check', rev: '03', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Cables', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-06', desc: 'Trace Heating-A Test', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-07', desc: 'EIT Area Check -B (after EIT Check)', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'E', template: 'Single Tag Checklist', hrs: '', ch1: 'Est Hrs', ch2: 'OK', ch3: 'Item', checked: false },
    { id: 'MCR-08', desc: 'Trace Heating-B Test (after installation)', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'H', template: 'Single Tag Checklist', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-01', desc: 'Instrument Installation', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Instruments', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-01B', desc: 'Instrument Installation', header: 'Mechanical Completion Check', rev: '01', phase: '▼', disc: 'MC', eng: 'I', template: 'Single Instruments', hrs: '', ch1: 'OK', ch2: 'OK', ch3: 'NA', checked: false },
    { id: 'MCR-02', desc: 'Control Panel', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'i', template: 'Instruments', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-03', desc: 'Fire & Gas Equipment Test (instrument / MEG)', header: 'Mechanical Completion Check', rev: 'A', phase: '▼', disc: 'MC', eng: 'I', template: 'Fire and Gas', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-04B', desc: 'Level 1 - Early Loop Test (Instrument)', header: 'Mechanical Completion Check', rev: 'A', phase: '▼', disc: 'MC', eng: 'I', template: 'Instruments', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: true, selected: true },
    { id: 'MCR-05', desc: 'Instrument Tubing Test and Cleaning', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Master Tag Checklist', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-06', desc: 'Instrument Junction Boxes', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Cables', hrs: '2', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
    { id: 'MCR-07', desc: 'Junction Boxes', header: 'Mechanical Completion Check', rev: '02', phase: '▼', disc: 'MC', eng: 'I', template: 'Single Tag Checklist', hrs: '', ch1: 'OK', ch2: 'PL', ch3: 'NA', checked: false },
  ];

  return (
    <div className="flex flex-col w-full  bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="divide-x divide-gray-200">
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cert ID</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rev</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid For Phase</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disc</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eng Register</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Template</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est Hrs</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Header 1</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Item Header 2</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Item Header 3</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className={`hover:bg-gray-50 divide-x divide-gray-200 ${row.selected ? 'bg-blue-50 border-blue-200' : ''}`}>
                <td className="px-2 py-1 whitespace-nowrap">
                  <input type="checkbox" checked={row.checked} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs font-medium text-gray-900">{row.id}</td>
                <td className="px-2 py-1 text-xs text-gray-900 max-w-32 truncate">{row.desc}</td>
                <td className="px-2 py-1 text-xs text-gray-900 max-w-40 truncate">{row.header}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.rev}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.phase}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.disc}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.eng}</td>
                <td className="px-2 py-1 text-xs text-gray-900 max-w-24 truncate">{row.template}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.hrs}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.ch1}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.ch2}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{row.ch3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-shrink-0 px-3 py-2 flex items-center justify-between border-t border-gray-200 bg-gray-50 text-xs z-20">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">Previous</button>
          <button className="ml-2 px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">Next</button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">25</span> of{' '}
              <span className="font-medium">57</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="px-2 py-1 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50">Previous</button>
              <span className="px-3 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700">javascript:void(0)</span>
              <button className="px-2 py-1 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50">Next</button>
            </nav>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-700 mr-1">Rows</span>
          <select className="border border-gray-300 rounded px-1 py-0.5 text-xs">
            <option>25</option>
          </select>
          <div className="flex space-x-1 ml-2">
            <button className="px-2 py-0.5 border border-gray-300 rounded text-xs bg-gray-100 text-gray-700">⟐ Export data with options</button>
            <button className="px-2 py-0.5 border border-gray-300 rounded text-xs bg-green-100 text-green-700">⟐ Export to excel</button>
            <button className="px-2 py-0.5 border border-gray-300 rounded text-xs bg-red-100 text-red-700">⟐ Export to pdf</button>
            <button className="px-2 py-0.5 border border-gray-300 rounded text-xs bg-blue-100 text-blue-700">⟐ Record info</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckListandCertificates;
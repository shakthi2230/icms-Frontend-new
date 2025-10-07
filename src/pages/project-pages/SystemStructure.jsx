import React from 'react';

function SystemStructure() {
  const data = [
    { title: 'Cables', engRegister: 'atv, ENG, Cables', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: true, typePop: true, tagImport: true, importMarkup: true, selected: true },
    { title: 'Circuit Starters', engRegister: 'atv, ENG, CircuitStarter', validFor: '▼', manualInput: false, delete: false, rename: false, syntax: false, typePop: false, tagImport: false, importMarkup: false, selected: false },
    { title: 'Dummy Tags', engRegister: 'atv, ENG, DummyTags', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { title: 'Fire and Gas', engRegister: 'atv, ENG, FireGas', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: false, importMarkup: false, selected: false },
    { title: 'Function Block', engRegister: 'atv, ENG, FunctionBlock', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: false, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { title: 'HVAC Cables', engRegister: 'atv, ENG, HVACCables', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: false, typePop: true, tagImport: false, importMarkup: false, selected: false },
    { title: 'Instruments', engRegister: 'atv, ENG, Instruments', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: true, typePop: true, tagImport: false, importMarkup: false, selected: false },
    { title: 'Junction Boxes', engRegister: 'atv, ENG, JunctionBoxes', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: false, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { title: 'Loops', engRegister: 'atv, ENG, Loops', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { title: 'Master Equipment', engRegister: 'atv, ENG, MasterEquipment', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: true, typePop: false, tagImport: false, importMarkup: false, selected: false },
    { title: 'Piping Safety Items', engRegister: 'atv, ENG, PipingSafetyItems', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { title: 'Signals', engRegister: 'atv, ENG, Signals', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: true, typePop: true, tagImport: false, importMarkup: false, selected: false },
    { title: 'Telecom', engRegister: 'atv, ENG, Telecom', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: true, typePop: false, tagImport: true, importMarkup: false, selected: false },
    { title: 'Testpacks', engRegister: 'atv, ENG, Testpacks', validFor: '▼', manualInput: true, delete: true, rename: false, syntax: true, typePop: false, tagImport: true, importMarkup: true, selected: false },
    { title: 'Validation Errors', engRegister: 'atv, ENG, ValidationErrors', validFor: '▼', manualInput: true, delete: true, rename: true, syntax: false, typePop: true, tagImport: true, importMarkup: false, selected: false },
    { title: 'Valves', engRegister: 'atv, ENG, Valves', validFor: '▼', manualInput: true, delete: false, rename: true, syntax: false, typePop: false, tagImport: true, importMarkup: false, selected: false },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm  overflow-hidden">


      {/* Table */}
      <div className="overflow-x-auto h-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Eng Register</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Valid For Project</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Enable Manual Input</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Enable Delete</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Enable Rename</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Enable Syntax Validation</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Enable Type Population</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Enable Tag Import Markup</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Import Markup</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  row.selected ? 'bg-blue-50 border-b-2 border-blue-200' : ''
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">{row.title}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">{row.engRegister}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>{row.validFor}</option>
                  </select>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.manualInput}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.delete}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.rename}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.syntax}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.typePop}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.tagImport}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={row.importMarkup}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SystemStructure;
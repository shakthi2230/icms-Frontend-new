import React from 'react';

function Contractors() {
  const sidebarData = [
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
    { code: 'LVO', name: 'Lov / Deliia', selected: false },
    { code: 'MNO', name: 'MNC/Opaq Varco', selected: false },
    { code: 'NAN', name: 'Naves, Spain, Norway', selected: false },
    { code: 'PYO', name: 'Pyomo Partner -', selected: false },
    { code: 'ROT', name: 'Romik AS Piller - Maintenance FS Rot 2', selected: false },
    { code: 'STO', name: 'Stabi & Naversh OV DC 2', selected: false },
    { code: 'STS', name: 'STS/MDRG Insulation', selected: false },
    { code: 'SUL', name: 'Sulzer Pumps GmbH', selected: false },
    { code: 'TAI', name: 'Taiho', selected: false },
    { code: 'VEG', name: 'Vega', selected: false },
    { code: 'VUL', name: 'Vulkan', selected: false },
    { code: 'WEB', name: 'Webs', selected: false },
  ];

  const tableData = [
    { name: 'ahmed.fazil@binz.com', discipline: 'binz.fazil', enabled: true, autoSubscribe: false },
    { name: '', discipline: '', enabled: false, autoSubscribe: false },
    { name: '', discipline: '', enabled: true, autoSubscribe: true },
    // Add more rows as needed to match the image; truncated for brevity
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Contractors</h3>
          <ul className="space-y-1">
            {sidebarData.map((item, index) => (
              <li key={index} className={`p-2 rounded cursor-pointer ${item.selected ? 'bg-blue-100 border border-blue-200' : 'hover:bg-gray-100'}`}>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.selected} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-medium text-gray-900">{item.code}</span>
                  <span className="text-xs text-gray-600 flex-1 truncate">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Export Section */}
        <div className="p-2 border-t border-gray-200 mt-4">
          <div className="space-y-1">
            <button className="w-full text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 p-1 rounded">⟐ Export data with options</button>
            <button className="w-full text-xs text-green-700 bg-green-100 hover:bg-green-200 p-1 rounded">⟐ Export to excel</button>
            <button className="w-full text-xs text-red-700 bg-red-100 hover:bg-red-200 p-1 rounded">⟐ Export to pdf</button>
            <button className="w-full text-xs text-blue-700 bg-blue-100 hover:bg-blue-200 p-1 rounded">⟐ Record info</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Contract ID" className="px-3 py-1 border border-gray-300 rounded-md text-sm w-32" />
              <input type="text" placeholder="Description" className="px-3 py-1 border border-gray-300 rounded-md text-sm w-48" />
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Search</button>
              <button className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400">Cancel</button>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <input type="text" placeholder="Contract No." className="px-3 py-1 border border-gray-300 rounded-md text-sm w-32" />
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                <option>Contractor Group 1</option>
                <option>Contractor Group 2</option>
                <option>Contractor Group 3</option>
                <option>Contractor Group 4</option>
              </select>
              <span className="text-sm text-gray-500">Disabled</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discipline</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enabled</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto Subscribe</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-xs font-medium text-gray-900">ABB</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input type="text" placeholder="Search..." className="px-2 py-1 border border-gray-300 rounded text-xs w-20" />
                  </td>
                  <td className="px-4 py-2">
                    <input type="email" value={row.name} className="px-2 py-1 border border-gray-300 rounded text-xs w-full" />
                  </td>
                  <td className="px-4 py-2">
                    <input type="text" value={row.discipline} className="px-2 py-1 border border-gray-300 rounded text-xs w-full" />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input type="checkbox" checked={row.enabled} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input type="checkbox" checked={row.autoSubscribe} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                </tr>
              ))}
              {/* Add empty rows or more data to fill as per image */}
              {[...Array(10)].map((_, index) => (
                <tr key={`empty-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2"><div className="flex items-center space-x-2"><input type="checkbox" className="rounded border-gray-300 text-blue-600" /><span className="text-xs">ABB</span></div></td>
                  <td className="px-4 py-2"><input type="text" className="px-2 py-1 border border-gray-300 rounded text-xs w-20" /></td>
                  <td className="px-4 py-2"><input type="text" className="px-2 py-1 border border-gray-300 rounded text-xs" /></td>
                  <td className="px-4 py-2"><input type="text" className="px-2 py-1 border border-gray-300 rounded text-xs" /></td>
                  <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300 text-blue-600" /></td>
                  <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300 text-blue-600" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border border-gray-300 rounded-md text-xs bg-white hover:bg-gray-50">‹</button>
            <span className="text-xs text-gray-700">1-42 of 42</span>
            <button className="px-2 py-1 border border-gray-300 rounded-md text-xs bg-white hover:bg-gray-50">›</button>
            <span className="text-xs text-gray-700">1 of 1</span>
            <select className="px-2 py-1 border border-gray-300 rounded-md text-xs ml-2">
              <option>30</option>
            </select>
            <span className="text-xs text-gray-700">Rows</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contractors;
import React from "react";

function TagRegister() {
  const columns = [
    "Tag No",
    "Description",
    "System",
    "Subsystem",
    "Discipline",
    "Category",
    "Location",
    "Drawing No",
    "Revision",
    "Manufacturer",
    "Model No",
    "Serial No",
    "Installed Date",
    "Status",
    "Remarks",
    "Updated By",
    "Updated Date",
  ];

const data = [
  {
    tagNo: "TAG-001",
    description: "Main Pump Assembly",
    system: "Pumping System",
    subsystem: "Sub-01",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Plant A",
    drawingNo: "DRW-101",
    revision: "Rev 1",
    manufacturer: "KSB Pumps Ltd",
    modelNo: "KSB-400X",
    serialNo: "MP2024-1001",
    installedDate: "2024-09-04",
    status: "Active",
    remarks: "Operational",
    updatedBy: "John D",
    updatedDate: "2024-09-04",
  },
  {
    tagNo: "TAG-002",
    description: "Control Valve CV-101",
    system: "Flow Control",
    subsystem: "Sub-02",
    discipline: "Instrumentation",
    category: "Valve",
    location: "Unit B",
    drawingNo: "DRW-102",
    revision: "Rev 2",
    manufacturer: "Fisher Controls",
    modelNo: "FCV-550",
    serialNo: "CV2024-102",
    installedDate: "2024-09-05",
    status: "Inactive",
    remarks: "Awaiting calibration",
    updatedBy: "Sarah M",
    updatedDate: "2024-09-05",
  },
  {
    tagNo: "TAG-003",
    description: "Pressure Transmitter PT-201",
    system: "Pressure Monitoring",
    subsystem: "Sub-03",
    discipline: "Instrumentation",
    category: "Sensor",
    location: "Unit C",
    drawingNo: "DRW-103",
    revision: "Rev 1",
    manufacturer: "Yokogawa",
    modelNo: "EJA530E",
    serialNo: "PT2024-203",
    installedDate: "2024-09-06",
    status: "Active",
    remarks: "Reading stable",
    updatedBy: "Kevin T",
    updatedDate: "2024-09-06",
  },
  {
    tagNo: "TAG-004",
    description: "Motor Control Panel",
    system: "Electrical Distribution",
    subsystem: "Sub-04",
    discipline: "Electrical",
    category: "Panel",
    location: "Plant B",
    drawingNo: "DRW-104",
    revision: "Rev 3",
    manufacturer: "Siemens",
    modelNo: "MCP-900",
    serialNo: "MCP2024-404",
    installedDate: "2024-09-07",
    status: "Active",
    remarks: "Routine maintenance done",
    updatedBy: "David L",
    updatedDate: "2024-09-07",
  },
  {
    tagNo: "TAG-005",
    description: "Heat Exchanger HX-301",
    system: "Cooling System",
    subsystem: "Sub-05",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Plant C",
    drawingNo: "DRW-105",
    revision: "Rev 1",
    manufacturer: "Alfa Laval",
    modelNo: "ALX-200",
    serialNo: "HX2024-305",
    installedDate: "2024-09-08",
    status: "Active",
    remarks: "Cleaned and ready",
    updatedBy: "Priya K",
    updatedDate: "2024-09-08",
  },
  {
    tagNo: "TAG-006",
    description: "Temperature Transmitter TT-401",
    system: "Thermal Monitoring",
    subsystem: "Sub-06",
    discipline: "Instrumentation",
    category: "Sensor",
    location: "Unit D",
    drawingNo: "DRW-106",
    revision: "Rev 2",
    manufacturer: "Honeywell",
    modelNo: "STT750",
    serialNo: "TT2024-406",
    installedDate: "2024-09-09",
    status: "Active",
    remarks: "Temperature stable",
    updatedBy: "Rajesh P",
    updatedDate: "2024-09-09",
  },
  {
    tagNo: "TAG-007",
    description: "Compressor Unit CU-501",
    system: "Air Compression",
    subsystem: "Sub-07",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Plant D",
    drawingNo: "DRW-107",
    revision: "Rev 1",
    manufacturer: "Atlas Copco",
    modelNo: "ZX7-150",
    serialNo: "CU2024-507",
    installedDate: "2024-09-10",
    status: "Active",
    remarks: "Running smoothly",
    updatedBy: "Arun J",
    updatedDate: "2024-09-10",
  },
  {
    tagNo: "TAG-008",
    description: "Generator Panel GP-601",
    system: "Power Backup",
    subsystem: "Sub-08",
    discipline: "Electrical",
    category: "Panel",
    location: "Unit E",
    drawingNo: "DRW-108",
    revision: "Rev 2",
    manufacturer: "ABB",
    modelNo: "GP-1200",
    serialNo: "GP2024-608",
    installedDate: "2024-09-11",
    status: "Inactive",
    remarks: "Awaiting inspection",
    updatedBy: "Deepa R",
    updatedDate: "2024-09-11",
  },
  {
    tagNo: "TAG-009",
    description: "Level Transmitter LT-701",
    system: "Tank Monitoring",
    subsystem: "Sub-09",
    discipline: "Instrumentation",
    category: "Sensor",
    location: "Tank Farm A",
    drawingNo: "DRW-109",
    revision: "Rev 1",
    manufacturer: "Endress+Hauser",
    modelNo: "Prosonic FMU90",
    serialNo: "LT2024-709",
    installedDate: "2024-09-12",
    status: "Active",
    remarks: "Accurate readings",
    updatedBy: "Kumar S",
    updatedDate: "2024-09-12",
  },
  {
    tagNo: "TAG-010",
    description: "Boiler Feed Pump BFP-801",
    system: "Steam Generation",
    subsystem: "Sub-10",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Boiler House",
    drawingNo: "DRW-110",
    revision: "Rev 3",
    manufacturer: "Grundfos",
    modelNo: "BFP-60",
    serialNo: "BFP2024-810",
    installedDate: "2024-09-13",
    status: "Active",
    remarks: "Pressure normal",
    updatedBy: "Vijay T",
    updatedDate: "2024-09-13",
  },
  {
    tagNo: "TAG-011",
    description: "Cooling Fan CF-901",
    system: "Ventilation",
    subsystem: "Sub-11",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Plant E",
    drawingNo: "DRW-111",
    revision: "Rev 2",
    manufacturer: "Crompton Greaves",
    modelNo: "CFX-300",
    serialNo: "CF2024-911",
    installedDate: "2024-09-14",
    status: "Inactive",
    remarks: "Needs replacement",
    updatedBy: "Anita L",
    updatedDate: "2024-09-14",
  },
  {
    tagNo: "TAG-012",
    description: "PLC Control Module",
    system: "Automation",
    subsystem: "Sub-12",
    discipline: "Electrical",
    category: "Panel",
    location: "Unit F",
    drawingNo: "DRW-112",
    revision: "Rev 1",
    manufacturer: "Allen-Bradley",
    modelNo: "1769-L33ER",
    serialNo: "PLC2024-1212",
    installedDate: "2024-09-15",
    status: "Active",
    remarks: "Program updated",
    updatedBy: "Ravi B",
    updatedDate: "2024-09-15",
  },
  {
    tagNo: "TAG-013",
    description: "Transformer TR-1101",
    system: "Power Distribution",
    subsystem: "Sub-13",
    discipline: "Electrical",
    category: "Equipment",
    location: "Substation A",
    drawingNo: "DRW-113",
    revision: "Rev 2",
    manufacturer: "GE Power",
    modelNo: "TX-25MVA",
    serialNo: "TR2024-113",
    installedDate: "2024-09-16",
    status: "Active",
    remarks: "Oil level normal",
    updatedBy: "Senthil N",
    updatedDate: "2024-09-16",
  },
  {
    tagNo: "TAG-014",
    description: "Fire Alarm Panel",
    system: "Safety System",
    subsystem: "Sub-14",
    discipline: "Electrical",
    category: "Panel",
    location: "Admin Block",
    drawingNo: "DRW-114",
    revision: "Rev 1",
    manufacturer: "Honeywell",
    modelNo: "FAP-900",
    serialNo: "FAP2024-114",
    installedDate: "2024-09-17",
    status: "Active",
    remarks: "All zones operational",
    updatedBy: "Meena R",
    updatedDate: "2024-09-17",
  },
  {
    tagNo: "TAG-015",
    description: "CCTV Camera CAM-1501",
    system: "Security System",
    subsystem: "Sub-15",
    discipline: "Instrumentation",
    category: "Device",
    location: "Main Gate",
    drawingNo: "DRW-115",
    revision: "Rev 3",
    manufacturer: "Hikvision",
    modelNo: "DS-2CD2145FWD",
    serialNo: "CAM2024-1515",
    installedDate: "2024-09-18",
    status: "Active",
    remarks: "Recording 24/7",
    updatedBy: "Ramesh G",
    updatedDate: "2024-09-18",
  },
  {
    tagNo: "TAG-016",
    description: "Emergency Light EL-1601",
    system: "Lighting System",
    subsystem: "Sub-16",
    discipline: "Electrical",
    category: "Device",
    location: "Corridor A",
    drawingNo: "DRW-116",
    revision: "Rev 1",
    manufacturer: "Philips",
    modelNo: "EL-100",
    serialNo: "EL2024-1616",
    installedDate: "2024-09-19",
    status: "Active",
    remarks: "Battery replaced",
    updatedBy: "Sita P",
    updatedDate: "2024-09-19",
  },
  {
    tagNo: "TAG-017",
    description: "Air Handling Unit AHU-1701",
    system: "HVAC",
    subsystem: "Sub-17",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Plant F",
    drawingNo: "DRW-117",
    revision: "Rev 2",
    manufacturer: "Voltas",
    modelNo: "VAHU-700",
    serialNo: "AHU2024-1717",
    installedDate: "2024-09-20",
    status: "Active",
    remarks: "Clean filters",
    updatedBy: "Hari S",
    updatedDate: "2024-09-20",
  },
  {
    tagNo: "TAG-018",
    description: "Conveyor Belt CB-1801",
    system: "Material Handling",
    subsystem: "Sub-18",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Warehouse",
    drawingNo: "DRW-118",
    revision: "Rev 3",
    manufacturer: "Fenner",
    modelNo: "CBX-450",
    serialNo: "CB2024-1818",
    installedDate: "2024-09-21",
    status: "Inactive",
    remarks: "Alignment issue",
    updatedBy: "Naveen R",
    updatedDate: "2024-09-21",
  },
  {
    tagNo: "TAG-019",
    description: "Smoke Detector SD-1901",
    system: "Fire Protection",
    subsystem: "Sub-19",
    discipline: "Instrumentation",
    category: "Device",
    location: "Office Floor",
    drawingNo: "DRW-119",
    revision: "Rev 1",
    manufacturer: "Bosch",
    modelNo: "FAP-425",
    serialNo: "SD2024-1919",
    installedDate: "2024-09-22",
    status: "Active",
    remarks: "Tested OK",
    updatedBy: "Kavya L",
    updatedDate: "2024-09-22",
  },
  {
    tagNo: "TAG-020",
    description: "UPS System UPS-2001",
    system: "Power Backup",
    subsystem: "Sub-20",
    discipline: "Electrical",
    category: "Equipment",
    location: "Control Room",
    drawingNo: "DRW-120",
    revision: "Rev 2",
    manufacturer: "APC",
    modelNo: "Smart-UPS-5000",
    serialNo: "UPS2024-2020",
    installedDate: "2024-09-23",
    status: "Active",
    remarks: "Load stable",
    updatedBy: "Dinesh K",
    updatedDate: "2024-09-23",
  },
  {
    tagNo: "TAG-021",
    description: "Relay Panel RP-2101",
    system: "Power Distribution",
    subsystem: "Sub-21",
    discipline: "Electrical",
    category: "Panel",
    location: "Substation B",
    drawingNo: "DRW-121",
    revision: "Rev 1",
    manufacturer: "Schneider Electric",
    modelNo: "RPX-600",
    serialNo: "RP2024-2121",
    installedDate: "2024-09-24",
    status: "Active",
    remarks: "Relay replaced",
    updatedBy: "Anand P",
    updatedDate: "2024-09-24",
  },
  {
    tagNo: "TAG-022",
    description: "Gas Detector GD-2201",
    system: "Safety System",
    subsystem: "Sub-22",
    discipline: "Instrumentation",
    category: "Sensor",
    location: "Plant G",
    drawingNo: "DRW-122",
    revision: "Rev 3",
    manufacturer: "Dräger",
    modelNo: "GD-500",
    serialNo: "GD2024-2222",
    installedDate: "2024-09-25",
    status: "Active",
    remarks: "Calibrated",
    updatedBy: "Sundar V",
    updatedDate: "2024-09-25",
  },
  {
    tagNo: "TAG-023",
    description: "Hydraulic Pump HP-2301",
    system: "Hydraulic System",
    subsystem: "Sub-23",
    discipline: "Mechanical",
    category: "Equipment",
    location: "Unit G",
    drawingNo: "DRW-123",
    revision: "Rev 2",
    manufacturer: "Parker",
    modelNo: "HPX-900",
    serialNo: "HP2024-2323",
    installedDate: "2024-09-26",
    status: "Active",
    remarks: "Pressure stable",
    updatedBy: "Gokul N",
    updatedDate: "2024-09-26",
  },
  {
    tagNo: "TAG-024",
    description: "Vibration Sensor VS-2401",
    system: "Condition Monitoring",
    subsystem: "Sub-24",
    discipline: "Instrumentation",
    category: "Sensor",
    location: "Unit H",
    drawingNo: "DRW-124",
    revision: "Rev 1",
    manufacturer: "SKF",
    modelNo: "CMSS-785A",
    serialNo: "VS2024-2424",
    installedDate: "2024-09-27",
    status: "Inactive",
    remarks: "Low signal detected",
    updatedBy: "Lakshmi T",
    updatedDate: "2024-09-27",
  },
  {
    tagNo: "TAG-025",
    description: "Main Transformer TR-2501",
    system: "Electrical Supply",
    subsystem: "Sub-25",
    discipline: "Electrical",
    category: "Equipment",
    location: "Main Yard",
    drawingNo: "DRW-125",
    revision: "Rev 3",
    manufacturer: "BHEL",
    modelNo: "TRX-50MVA",
    serialNo: "TR2024-2525",
    installedDate: "2024-09-28",
    status: "Active",
    remarks: "Fully operational",
    updatedBy: "Nirmal S",
    updatedDate: "2024-09-28",
  },
];

  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs flex flex-col">
      {/* Table Scrollable Area */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="divide-x divide-gray-200">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 divide-x divide-gray-100"
              >
                <td className="px-2 py-2 whitespace-nowrap font-medium text-gray-900">
                  {row.tagNo}
                </td>
                <td className="px-2 py-2 text-gray-700 max-w-xs truncate">
                  {row.description}
                </td>
                <td className="px-2 py-2 text-gray-700">{row.system}</td>
                <td className="px-2 py-2 text-gray-700">{row.subsystem}</td>
                <td className="px-2 py-2 text-gray-700">{row.discipline}</td>
                <td className="px-2 py-2 text-gray-700">{row.category}</td>
                <td className="px-2 py-2 text-gray-700">{row.location}</td>
                <td className="px-2 py-2 text-gray-700">{row.drawingNo}</td>
                <td className="px-2 py-2 text-gray-700">{row.revision}</td>
                <td className="px-2 py-2 text-gray-700">{row.manufacturer}</td>
                <td className="px-2 py-2 text-gray-700">{row.modelNo}</td>
                <td className="px-2 py-2 text-gray-700">{row.serialNo}</td>
                <td className="px-2 py-2 text-gray-700">
                  {row.installedDate}
                </td>
                <td
                  className={`px-2 py-2 font-semibold ${
                    row.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {row.status}
                </td>
                <td className="px-2 py-2 text-gray-700 max-w-xs truncate">
                  {row.remarks}
                </td>
                <td className="px-2 py-2 text-gray-700">{row.updatedBy}</td>
                <td className="px-2 py-2 text-gray-700">{row.updatedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-gray-700">
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
            ‹
          </button>
          <span>1–4 of 50</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
            ›
          </button>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <span>Page 1 of 13</span>
          <span className="ml-1">▼</span>
        </div>
      </div>
    </div>
  );
}

export default TagRegister;

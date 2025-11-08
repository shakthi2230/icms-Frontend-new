import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, TrendingUp, AlertCircle, CheckCircle, Users, Briefcase } from 'lucide-react';

export default function GenerateReport() {
  const [reportType, setReportType] = useState('comprehensive');
  const [dateRange, setDateRange] = useState('monthly');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Demo company data
  const companyData = {
    name: 'Saudi Aramco Limited',
    registrationNumber: 'SA-2024-001',
    country: 'Saudi Arabia',
    industryType: 'Oil & Gas Exploration',
    totalEmployees: 75000,
    operatingArea: 'Middle East',
    email: 'admin@saudiaramco.com',
    phone: '+966 1234 56789',
    website: 'www.saudiaramco.com'
  };

  // Demo project data
  const projectsData = [
    {
      id: 1,
      name: 'Safaniyah Oil Field Development',
      status: 'In Progress',
      progress: 65,
      budget: 2500000,
      spent: 1625000,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      manager: 'Ahmed Al-Dossary'
    },
    {
      id: 2,
      name: 'Ghawar Enhanced Oil Recovery',
      status: 'Completed',
      progress: 100,
      budget: 3200000,
      spent: 3200000,
      startDate: '2023-06-01',
      endDate: '2024-01-15',
      manager: 'Mohammed Al-Saud'
    },
    {
      id: 3,
      name: 'Berri Field Pipeline Extension',
      status: 'Planning',
      progress: 15,
      budget: 1800000,
      spent: 270000,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      manager: 'Fatima Al-Rashid'
    }
  ];

  // Demo user data
  const usersData = [
    {
      id: 1,
      name: 'Ahmed Al-Dossary',
      role: 'Project Manager',
      department: 'Operations',
      status: 'Active',
      joinDate: '2020-03-15'
    },
    {
      id: 2,
      name: 'Aisha Al-Otaibi',
      role: 'Field Engineer',
      department: 'Engineering',
      status: 'Active',
      joinDate: '2021-07-20'
    },
    {
      id: 3,
      name: 'Mohammed Al-Saud',
      role: 'Safety Officer',
      department: 'Health & Safety',
      status: 'Active',
      joinDate: '2019-01-10'
    }
  ];

  // Demo statistics
  const statistics = {
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 6,
    plannedProjects: 1,
    totalBudget: 15000000,
    totalSpent: 8500000,
    activeUsers: 850,
    totalUsers: 1248,
    completionRate: 78,
    budgetUtilization: 56.7
  };

  const generatePDFReport = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        // Create HTML content for PDF
        let htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #1f2937;
                color: #fbbf24;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .header p {
                margin: 5px 0 0 0;
                font-size: 12px;
                color: #d1d5db;
              }
              .section {
                margin-bottom: 25px;
                page-break-inside: avoid;
              }
              .section-title {
                background-color: #fbbf24;
                color: #000;
                padding: 10px 15px;
                font-weight: bold;
                font-size: 14px;
                border-radius: 4px;
                margin-bottom: 15px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
              }
              th {
                background-color: #fbbf24;
                color: #000;
                padding: 10px;
                text-align: left;
                font-weight: bold;
                border: 1px solid #e5e7eb;
              }
              td {
                padding: 10px;
                border: 1px solid #e5e7eb;
                background-color: #fff;
              }
              tr:nth-child(even) td {
                background-color: #f3f4f6;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .info-label {
                font-weight: bold;
                color: #1f2937;
                width: 40%;
              }
              .info-value {
                color: #374151;
                width: 60%;
              }
              .stats-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 15px 0;
              }
              .stat-box {
                background-color: #f3f4f6;
                padding: 15px;
                border-left: 4px solid #fbbf24;
                border-radius: 4px;
              }
              .stat-label {
                font-size: 12px;
                color: #6b7280;
                margin-bottom: 5px;
              }
              .stat-value {
                font-size: 18px;
                font-weight: bold;
                color: #fbbf24;
              }
              .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 2px solid #e5e7eb;
                text-align: center;
                font-size: 11px;
                color: #9ca3af;
              }
              @media print {
                body { background-color: white; }
                .section { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <!-- Header -->
            <div class="header">
              <h1>Oil & Gas Company Report</h1>
              <p>Generated on ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}</p>
            </div>

            <!-- Company Information Section -->
            <div class="section">
              <div class="section-title">Company Information</div>
              <div class="info-row">
                <span class="info-label">Company Name:</span>
                <span class="info-value">${companyData.name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Registration Number:</span>
                <span class="info-value">${companyData.registrationNumber}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Country:</span>
                <span class="info-value">${companyData.country}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Industry Type:</span>
                <span class="info-value">${companyData.industryType}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Total Employees:</span>
                <span class="info-value">${companyData.totalEmployees.toLocaleString()}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Operating Area:</span>
                <span class="info-value">${companyData.operatingArea}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${companyData.email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${companyData.phone}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Website:</span>
                <span class="info-value">${companyData.website}</span>
              </div>
            </div>

            <!-- Key Statistics Section -->
            <div class="section">
              <div class="section-title">Key Statistics</div>
              <div class="stats-grid">
                <div class="stat-box">
                  <div class="stat-label">Total Projects</div>
                  <div class="stat-value">${statistics.totalProjects}</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Active Projects</div>
                  <div class="stat-value">${statistics.activeProjects}</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Completed Projects</div>
                  <div class="stat-value">${statistics.completedProjects}</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Planned Projects</div>
                  <div class="stat-value">${statistics.plannedProjects}</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Total Budget</div>
                  <div class="stat-value">$${(statistics.totalBudget / 1000000).toFixed(2)}M</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Total Spent</div>
                  <div class="stat-value">$${(statistics.totalSpent / 1000000).toFixed(2)}M</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Budget Utilization</div>
                  <div class="stat-value">${statistics.budgetUtilization.toFixed(1)}%</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Completion Rate</div>
                  <div class="stat-value">${statistics.completionRate}%</div>
                </div>
              </div>
              <table>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>Active Users</td>
                  <td>${statistics.activeUsers}</td>
                </tr>
                <tr>
                  <td>Total Users</td>
                  <td>${statistics.totalUsers}</td>
                </tr>
              </table>
            </div>

            ${reportType === 'comprehensive' || reportType === 'projects' ? `
            <!-- Projects Summary Section -->
            <div class="section">
              <div class="section-title">Projects Summary</div>
              <table>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Manager</th>
                  <th>Budget</th>
                </tr>
                ${projectsData.map(project => `
                  <tr>
                    <td>${project.name}</td>
                    <td>${project.status}</td>
                    <td>${project.progress}%</td>
                    <td>${project.manager}</td>
                    <td>$${(project.budget / 1000000).toFixed(2)}M</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            ` : ''}

            ${reportType === 'comprehensive' || reportType === 'users' ? `
            <!-- Users Section -->
            <div class="section">
              <div class="section-title">Active Users</div>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Join Date</th>
                </tr>
                ${usersData.map(user => `
                  <tr>
                    <td>${user.name}</td>
                    <td>${user.role}</td>
                    <td>${user.department}</td>
                    <td>${user.status}</td>
                    <td>${user.joinDate}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            ` : ''}

            <!-- Footer -->
            <div class="footer">
              <p>Report Period: ${startDate} to ${endDate}</p>
              <p>Report Type: ${reportType === 'comprehensive' ? 'Comprehensive' : reportType === 'projects' ? 'Projects Only' : reportType === 'users' ? 'Users Only' : 'Financial Summary'}</p>
              <p>© 2024 ${companyData.name}. All rights reserved.</p>
            </div>
          </body>
          </html>
        `;

        // Create blob from HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);

        // Wait for iframe to load, then print to PDF
        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow.print();
            URL.revokeObjectURL(url);
            document.body.removeChild(iframe);
            
            setAlert({
              show: true,
              message: `Report ready! Use your browser's print dialog to save as PDF.`,
              type: 'success'
            });
            setLoading(false);
            setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
          }, 500);
        };

      } catch (error) {
        console.error('Error:', error);
        setAlert({
          show: true,
          message: 'Error generating report. Please try again.',
          type: 'error'
        });
        setLoading(false);
      }
    }, 1500);
  };

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
          <span className="text-sm sm:text-base">{alert.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <FileText size={32} className="text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Report Generation</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">Create and download company reports in PDF format</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Filter size={20} className="text-yellow-400" />
              Report Configuration
            </h2>

            {/* Report Type */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-semibold text-gray-200">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
              >
                <option value="comprehensive">Comprehensive Report</option>
                <option value="projects">Projects Only</option>
                <option value="users">Users Only</option>
                <option value="financial">Financial Summary</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-semibold text-gray-200">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                <Calendar size={16} /> Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
              />
            </div>

            {/* End Date */}
            <div className="space-y-3 mb-8">
              <label className="block text-sm font-semibold text-gray-200 flex items-center gap-2">
                <Calendar size={16} /> End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#252a38] border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePDFReport}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 disabled:scale-100"
            >
              <Download size={20} />
              <span>{loading ? 'Generating...' : 'Generate & Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info Card */}
          <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-yellow-400" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#252a38] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Company Name</p>
                <p className="text-white font-semibold">{companyData.name}</p>
              </div>
              <div className="bg-[#252a38] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Registration Number</p>
                <p className="text-white font-semibold">{companyData.registrationNumber}</p>
              </div>
              <div className="bg-[#252a38] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Industry Type</p>
                <p className="text-white font-semibold">{companyData.industryType}</p>
              </div>
              <div className="bg-[#252a38] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Employees</p>
                <p className="text-white font-semibold">{companyData.totalEmployees.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Projects</p>
                  <p className="text-3xl font-bold text-yellow-400">{statistics.totalProjects}</p>
                  <p className="text-green-400 text-xs mt-2">Active: {statistics.activeProjects}</p>
                </div>
                <div className="p-4 bg-yellow-500/20 rounded-lg">
                  <Briefcase size={32} className="text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Budget Utilization</p>
                  <p className="text-3xl font-bold text-yellow-400">{statistics.budgetUtilization.toFixed(1)}%</p>
                  <p className="text-green-400 text-xs mt-2">${(statistics.totalSpent / 1000000).toFixed(1)}M / ${(statistics.totalBudget / 1000000).toFixed(1)}M</p>
                </div>
                <div className="p-4 bg-green-500/20 rounded-lg">
                  <TrendingUp size={32} className="text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-blue-400">{statistics.completionRate}%</p>
                  <p className="text-green-400 text-xs mt-2">Completed: {statistics.completedProjects}</p>
                </div>
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <BarChart3 size={32} className="text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-purple-400">{statistics.activeUsers}</p>
                  <p className="text-green-400 text-xs mt-2">Total: {statistics.totalUsers}</p>
                </div>
                <div className="p-4 bg-purple-500/20 rounded-lg">
                  <Users size={32} className="text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Report Info */}
          <div className="bg-[#1e2130] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Report Details</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p><span className="font-semibold">Report Type:</span> {reportType === 'comprehensive' ? 'Comprehensive Report' : reportType === 'projects' ? 'Projects Only' : reportType === 'users' ? 'Users Only' : 'Financial Summary'}</p>
              <p><span className="font-semibold">Period:</span> {startDate} to {endDate}</p>
              <p><span className="font-semibold">Generated:</span> {new Date().toLocaleString()}</p>
              <p><span className="font-semibold">Format:</span> PDF Document</p>
              <p className="text-yellow-400 text-xs mt-4">💡 Tip: Click "Generate & Download PDF" and use your browser's print dialog (Ctrl+P or Cmd+P) to save as PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
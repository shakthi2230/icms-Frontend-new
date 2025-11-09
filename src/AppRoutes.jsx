// AppRoutes.js
import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AdminLogin from "./pages/logins/AdminLogin";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import ProjectLogin from "./pages/logins/ProjectLogin";
import ProjectDashboard from "./pages/project-pages/ProjectDashboard";
import Contractors from "./pages/project-pages/Contractors";
import SystemStructure from "./pages/project-pages/SystemStructure";
import CheckListandCertificates from "./pages/project-pages/CheckListandCertificates";
import CompletionStructure from "./pages/project-pages/CompletionStructure";
import CheckList from "./pages/project-pages/completion-structure/CheckLists";
import ImportsReports from "./pages/project-pages/completion-structure/ImportsReports";
import PunchItems from "./pages/project-pages/completion-structure/PunchItems";
import TagRegister from "./pages/project-pages/completion-structure/TagRegister";
import COMMregister from "./pages/project-pages/completion-structure/COMMregister";
import { LogOut, LogIn } from "lucide-react";
import { lazy, Suspense } from 'react';

// ===== Lazy Load Admin Pages =====
const AddNewCompany = lazy(() => import('./pages/admin-pages/AddNewCompany'));
const CreateNewUser = lazy(() => import('./pages/admin-pages/CreateNewUser'));
const AddNewProject = lazy(() => import('./pages/admin-pages/AddNewProject'));
const GenerateReport = lazy(() => import('./pages/admin-pages/GenerateReport'));

// ===== Loading Component =====
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f111a]">
      <div className="text-center">
        {/* Outer rotating ring */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-yellow-300 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center justify-center space-x-1">
          <p className="text-yellow-400 text-lg font-semibold tracking-wide">Loading</p>
          <div className="flex space-x-1">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
        
        <p className="text-blue-300 text-sm mt-2 opacity-75">Please wait...</p>
      </div>
    </div>
  );
}
// ===== Layout wrappers =====
function LoginLayout({ title, config }) {
  return (
    <Layout title={title} config={config}>
      <Outlet />
    </Layout>
  );
}

function HomeLayout() {
  const homeConfig = {
    logo: { name: "IComS", href: "/", color: "yellow" },
    menuItems: [
      { label: "Admin Login", icon: LogIn, href: "/admin-login" },
      { label: "Project Login", icon: LogIn, href: "/project-login" },
    ],
    footerItems: [{ label: "Logout", icon: LogOut, href: "#" }],
  };

  return (
    <Layout title="Home" config={homeConfig}>
      <Outlet />
    </Layout>
  );
}

function AdminLayout() {
  const adminConfig = {
    logo: { name: "IComS", href: "/admin-dashboard", color: "yellow" },
    menuItems: [
      { label: "Dashboard", icon: LogIn, href: "/admin-dashboard" },
      { label: "Company", icon: LogIn, href: "/admin-dashboard/add-company" },
      { label: "User", icon: LogIn, href: "/admin-dashboard/create-user" },
      { label: "Project", icon: LogIn, href: "/admin-dashboard/add-project" },
      { label: "Generate Report", icon: LogIn, href: "/admin-dashboard/generate-report" },
    ],
    footerItems: [{ label: "Logout", icon: LogOut, href: "/" }],
  };

  return (
    <Layout title="Administrator Dashboard" config={adminConfig}>
      <Outlet />
    </Layout>
  );
}

function ProjectLayout({ title, type = "dashboard" }) {
  let config = {
    logo: { name: "IComS", href: "/project-dashboard", color: "yellow" },
    menuItems: [],
    footerItems: [{ label: "Logout", icon: LogOut, href: "/" }],
  };

  switch (type) {
    case "dashboard":
      config.menuItems = [
        { label: "Check Lists and Certificates", icon: LogIn, href: "/checklist-certificates" },
        { label: "Contractors", icon: LogIn, href: "/contractors" },
        { label: "System Structure", icon: LogIn, href: "/SystemStructure" },
        { label: "Completion Structure", icon: LogIn, href: "/completionStructure" },
      ];
      break;
    case "checklist":
      config.menuItems = [
        { label: "Imports & Reports", icon: LogIn, href: "/imports-reports" },
      ];
      break;
    case "completion":
      config.menuItems = [
        { label: "Punch Items", icon: LogIn, href: "/punchitems" },
        { label: "Check Lists", icon: LogIn, href: "/checklist" },
        { label: "Tag Register", icon: LogIn, href: "/tag-register" },
        { label: "COMM Systems", icon: LogIn, href: "/comm-register" },
        { label: "Imports & Reports", icon: LogIn, href: "/imports-reports" },
      ];
      break;
    default:
      break;
  }

  return (
    <Layout title={title} config={config}>
      <Outlet />
    </Layout>
  );
}

// ===== Main Routing =====
export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Admin Login */}
      <Route
        path="/admin-login"
        element={
          <LoginLayout
            title="Admin Login"
            config={{
              logo: { name: "IComS", href: "/", color: "yellow" },
              menuItems: [],
              footerItems: [{ label: "Logout", icon: LogOut, href: "#" }],
            }}
          />
        }
      >
        <Route index element={<AdminLogin />} />
      </Route>

      {/* Admin Dashboard - Nested Routes */}
      <Route path="/admin-dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route
          path="add-company"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddNewCompany />
            </Suspense>
          }
        />
        <Route
          path="create-user"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CreateNewUser />
            </Suspense>
          }
        />
        <Route
          path="add-project"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AddNewProject />
            </Suspense>
          }
        />
        <Route
          path="generate-report"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <GenerateReport />
            </Suspense>
          }
        />
      </Route>

      {/* Project Login */}
      <Route
        path="/project-login"
        element={
          <LoginLayout
            title="Project Login"
            config={{
              logo: { name: "IComS", href: "/", color: "yellow" },
              menuItems: [],
              footerItems: [{ label: "Logout", icon: LogOut, href: "#" }],
            }}
          />
        }
      >
        <Route index element={<ProjectLogin />} />
      </Route>

      {/* Project Dashboard */}
      <Route
        path="/project-dashboard"
        element={<ProjectLayout title="Project Dashboard" type="dashboard" />}
      >
        <Route index element={<ProjectDashboard />} />
      </Route>

      <Route
        path="/checklist-certificates"
        element={<ProjectLayout title="Check Lists and Certificates" type="checklist" />}
      >
        <Route index element={<CheckListandCertificates />} />
      </Route>

      <Route
        path="/contractors"
        element={<ProjectLayout title="Contractors" type="checklist" />}
      >
        <Route index element={<Contractors />} />
      </Route>

      <Route
        path="/SystemStructure"
        element={<ProjectLayout title="System Structure" type="checklist" />}
      >
        <Route index element={<SystemStructure />} />
      </Route>

      <Route
        path="/completionStructure"
        element={<ProjectLayout title="Completion Structure" type="completion" />}
      >
        <Route index element={<CompletionStructure />} />
      </Route>

      <Route
        path="/checklist"
        element={<ProjectLayout title="Check Lists" type="completion" />}
      >
        <Route index element={<CheckList />} />
      </Route>

      <Route
        path="/imports-reports"
        element={<ProjectLayout title="Imports & Reports" type="completion" />}
      >
        <Route index element={<ImportsReports />} />
      </Route>

      <Route
        path="/punchitems"
        element={<ProjectLayout title="Punch Items" type="completion" />}
      >
        <Route index element={<PunchItems />} />
      </Route>

      <Route
        path="/tag-register"
        element={<ProjectLayout title="Tag Register" type="completion" />}
      >
        <Route index element={<TagRegister />} />
      </Route>

      <Route
        path="/comm-register"
        element={<ProjectLayout title="COMM Systems" type="completion" />}
      >
        <Route index element={<COMMregister />} />
      </Route>
    </Routes>
  );
}
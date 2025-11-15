import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { LogOut } from "lucide-react";

// Layouts
import HomeLayout from "./components/Layouts/HomeLayout";
import LoginLayout from "./components/Layouts/LoginLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import ProjectLayout from "./components/Layouts/ProjectLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Home & Auth Pages
import Home from "./pages/Home";
import AdminLogin from "./pages/logins/AdminLogin";
import ProjectLogin from "./pages/logins/ProjectLogin";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";

// Project Pages
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

// Lazy Loaded Admin Pages
const AddNewCompany = lazy(() => import('./pages/admin-pages/AddNewCompany'));
const CreateNewUser = lazy(() => import('./pages/admin-pages/CreateNewUser'));
const AddNewProject = lazy(() => import('./pages/admin-pages/AddNewProject'));
const GenerateReport = lazy(() => import('./pages/admin-pages/GenerateReport'));

// ===== Route Configuration =====
const LOGIN_CONFIG = {
  logo: { name: "IComS", href: "/", color: "yellow" },
  menuItems: [],
  footerItems: [{ label: "Logout", icon: LogOut, href: "#" }],
};

const ADMIN_ROUTES = [
  { path: "add-company", component: AddNewCompany },
  { path: "create-user", component: CreateNewUser },
  { path: "add-project", component: AddNewProject },
  { path: "generate-report", component: GenerateReport },
];

const PROJECT_ROUTES = [
  { path: "/project-dashboard", title: "Project Dashboard", type: "dashboard", component: ProjectDashboard },
  { path: "/checklist-certificates", title: "Check Lists and Certificates", type: "checklist", component: CheckListandCertificates },
  { path: "/contractors", title: "Contractors", type: "checklist", component: Contractors },
  { path: "/SystemStructure", title: "System Structure", type: "checklist", component: SystemStructure },
  { path: "/completionStructure", title: "Completion Structure", type: "completion", component: CompletionStructure },
  { path: "/checklist", title: "Check Lists", type: "completion", component: CheckList },
  { path: "/imports-reports", title: "Imports & Reports", type: "completion", component: ImportsReports },
  { path: "/punchitems", title: "Punch Items", type: "completion", component: PunchItems },
  { path: "/tag-register", title: "Tag Register", type: "completion", component: TagRegister },
  { path: "/comm-register", title: "COMM Systems", type: "completion", component: COMMregister },
];

// ===== Main Routing Component =====
export default function AppRoutes() {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Admin Login Route */}
      <Route
        path="/admin-login"
        element={<LoginLayout title="Admin Login" config={LOGIN_CONFIG} />}
      >
        <Route index element={<AdminLogin />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/admin-dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        {ADMIN_ROUTES.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* Project Login Route */}
      <Route
        path="/project-login"
        element={<LoginLayout title="Project Login" config={LOGIN_CONFIG} />}
      >
        <Route index element={<ProjectLogin />} />
      </Route>

      {/* Project Routes */}
      {PROJECT_ROUTES.map(({ path, title, type, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={<ProjectLayout title={title} type={type} />}
        >
          <Route index element={<Component />} />
        </Route>
      ))}
    </Routes>
  );
}
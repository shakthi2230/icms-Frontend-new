import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { LogOut, LogIn } from "lucide-react";
import useAdminStore from "../../context/AdminContext";

function AdminLayout() {
  const { logout } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();

  const templogout = () => {
    logout();
    navigate("/admin-login");
  };

  const getPageTitle = () => {
    if (location.pathname === "/admin-dashboard") return "Dashboard";
    if (location.pathname.includes("add-company")) return "Company";
    if (location.pathname.includes("create-user")) return "User";
    if (location.pathname.includes("add-project")) return "Project";
    if (location.pathname.includes("generate-report")) return "Generate Report";
    return "Administrator Dashboard";
  };

  const adminConfig = {
    logo: { name: "IComS", href: "/admin-dashboard", color: "yellow" },
    menuItems: [
      { label: "Dashboard", icon: LogIn, href: "/admin-dashboard" },
      { label: "Company", icon: LogIn, href: "/admin-dashboard/add-company" },
      { label: "User", icon: LogIn, href: "/admin-dashboard/create-user" },
      { label: "Project", icon: LogIn, href: "/admin-dashboard/add-project" },
      { label: "Generate Report", icon: LogIn, href: "/admin-dashboard/generate-report" },
    ],
    footerItems: [
      { label: "Logout", icon: LogOut, onClick: templogout },
    ],

  };

  return (
    <Layout title={getPageTitle()} config={adminConfig}>
      <Outlet />
    </Layout>
  );
}

export default AdminLayout;

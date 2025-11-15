

import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";
import { LogOut, LogIn } from "lucide-react";

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
export default AdminLayout;
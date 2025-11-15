import LoginLayout from "../components/Layouts/LoginLayout";
import AdminLogin from "../pages/logins/AdminLogin";
import { LogOut } from "lucide-react";

const LOGIN_CONFIG = {
  logo: { name: "IComS", href: "/", color: "yellow" },
  menuItems: [],
  footerItems: [{ label: "Logout", icon: LogOut, href: "#" }],
};

export const adminLoginRoutes = [
  {
    path: "/admin-login",
    element: <LoginLayout title="Admin Login" config={LOGIN_CONFIG} />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
];

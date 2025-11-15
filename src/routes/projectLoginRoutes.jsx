import LoginLayout from "../components/Layouts/LoginLayout";
import ProjectLogin from "../pages/logins/ProjectLogin";
import { LogOut } from "lucide-react";

const LOGIN_CONFIG = {
  logo: { name: "IComS", href: "/", color: "yellow" },
  menuItems: [],
  footerItems: [{ label: "Logout", icon: LogOut, href: "#" }],
};

export const projectLoginRoutes = [
  {
    path: "/project-login",
    element: <LoginLayout title="Project Login" config={LOGIN_CONFIG} />,
    children: [{ index: true, element: <ProjectLogin /> }],
  },
];

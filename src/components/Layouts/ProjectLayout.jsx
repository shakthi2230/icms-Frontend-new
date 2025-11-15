
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";
import { LogOut, LogIn } from "lucide-react";

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
export default ProjectLayout;
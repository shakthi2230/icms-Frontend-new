
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";
import { LogOut, LogIn } from "lucide-react";

function HomeLayout() {
  const homeConfig = {
    logo: { name: "IComS", href: "/", color: "yellow" },
    menuItems: [
      { label: "Admin Login", icon: LogIn, href: "/admin-login" },
      // { label: "Super User Login", icon: LogIn, href: "/admin-login" },
      { label: "Project Login", icon: LogIn, href: "/project-login" },
    ],
    footerItems: [{ label: "", icon: LogOut, href: "#" }],
  };

  return (
    <Layout title="Home" config={homeConfig}>
      <Outlet />
    </Layout>
  );

}

export default HomeLayout;

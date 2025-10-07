import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, config }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar config={config} />
      <div className="flex flex-col flex-1">
        <Header title={title} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

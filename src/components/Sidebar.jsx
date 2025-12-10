import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoArea from "./LogoArea";

export default function Sidebar({ config }) {
  const { logo, menuItems, footerItems } = config;
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  return (
    <div className="h-screen w-48 sm:w-56 lg:w-60 bg-[#1E2A38] text-yellow-400 flex flex-col flex-shrink-0">

      <LogoArea logo={logo} />

      <div className="px-3 flex items-center h-14 border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={20} className="text-yellow-400" />
          <span>Back</span>
        </button>
      </div>

      {/* MENU - hide active clicked menu item */}
      <div className="flex flex-col flex-1 mt-4 gap-3 px-3 text-xs sm:text-sm overflow-y-auto">
        {menuItems
          .filter(item => !activePath.includes(item.href.replace("/admin-dashboard", "")))
          .map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Icon size={16} />
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-700 cursor-pointer">
        {footerItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              onClick={item.onClick}
              href={item.href}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

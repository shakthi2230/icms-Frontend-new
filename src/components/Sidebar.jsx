import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoArea from "./LogoArea";

export default function Sidebar({ config }) {
  const { logo, menuItems, footerItems } = config;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-88 bg-[#1E2A38] text-yellow-400 flex flex-col flex-shrink-0">

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

      {/* Tree Menu */}
      <div className="flex flex-col flex-1 mt-4 gap-3 px-3 text-xs sm:text-sm overflow-y-auto">
        {menuItems.map((item, idx) => (
          <TreeItem key={idx} item={item} level={0} />
        ))}
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

function TreeItem({ item, level }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  const toggle = () => {
    if (item.subItems || item.children) setOpen(!open);
  };

  return (
    <div className="flex flex-col ">
      {/* MAIN ROW */}
      <div
        onClick={toggle}
        className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
        style={{ marginLeft: level * 16 }}
      >
        <Icon size={16} />
        <span>{item.label}</span>
      </div>

      {/* SUB ITEMS */}
      {open && item.subItems && (
        <div className="ml-5 mt-2 flex flex-col">
          {item.subItems.map((sub, idx) => (
            <TreeItem key={idx} item={sub} level={level + 1} />
          ))}
        </div>
      )}

      {/* CHILDREN */}
      {open && item.children && (
        <div className="my-2 ml-5 flex flex-col">
          {item.children.map((child, idx) => (
            <div
              key={idx}
              className="flex items-center p-1 gap-2 hover:text-white transition-colors"
              style={{ marginLeft: (level + 1) * 16 }}
            >
              <child.icon size={16} />
              <span>{child.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

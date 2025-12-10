// src/components/Sidebar.jsx
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoArea from "./LogoArea";

export default function Sidebar({ config }) {
  const { logo, menuItems = [], footerItems = [] } = config;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen min-w-60 w-auto max-w-full bg-[#1E2A38] text-yellow-400 flex flex-col flex-shrink-0">
      <LogoArea logo={logo} />

      {/* Back Button */}
      <div className="px-4 h-14 flex items-center border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Scrollable Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item, index) => (
          <TreeItem key={index} item={item} currentPath={location.pathname} />
        ))}
      </nav>

      {/* Logout Footer */}
      <div className="border-t border-gray-700 p-4">
        {footerItems.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.href)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm hover:text-white"
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Recursive Tree Menu Component
function TreeItem({ item, currentPath, level = 0 }) {
  const navigate = useNavigate();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const hasChildren = item.children && item.children.length > 0;
  const hasAnyChildren = hasSubItems || hasChildren;

  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand if current route is inside this item
  useEffect(() => {
    const pathsToCheck = [];

    if (item.href) pathsToCheck.push(item.href);
    if (hasSubItems) item.subItems.forEach(s => s.href && pathsToCheck.push(s.href));
    if (hasChildren) item.children.forEach(c => c.href && pathsToCheck.push(c.href));

    if (pathsToCheck.some(path => currentPath.startsWith(path))) {
      setIsOpen(true);
    }
  }, [currentPath, item, hasSubItems, hasChildren]);

  const Icon = item.icon || (() => <div className="w-5 h-5" />);

  const handleClick = (e) => {
    if (hasAnyChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    // If no children → let NavLink handle navigation
  };

  const isActive = item.href && currentPath.startsWith(item.href);

  return (
    <div className="mb-1">
      {/* Main Item */}
      {item.href ? (
        <NavLink
          to={item.href}
          end={!hasAnyChildren} // exact only if no children
          onClick={handleClick}
          className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all group
            ${isActive ? "bg-yellow-500/20 text-white font-semibold" : "hover:bg-gray-700"}
          `}
          style={{ paddingLeft: `${level * 24 + 16}px` }}
        >
          <div className="flex items-center gap-3">
            <Icon size={18} className={isActive ? "text-yellow-400" : ""} />
            <span className="text-sm">{item.label}</span>
          </div>

          {hasAnyChildren && (
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </NavLink>
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-gray-700 cursor-pointer"
          style={{ paddingLeft: `${level * 24 + 16}px` }}
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span className="text-sm">{item.label}</span>
          </div>
          {hasAnyChildren && (
            <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </div>
      )}

      {/* Submenu - only render when open */}
      {isOpen && (
        <div className="mt-1">
          {/* Render subItems (like "2 - HULL AND STRUCTURE") */}
          {item.subItems?.map((sub, i) => (
            <TreeItem key={i} item={sub} currentPath={currentPath} level={level + 1} />
          ))}

          {/* Render children (like "201 - HULL MATERIALS") */}
          {item.children?.map((child, i) => (
            <TreeItem key={i} item={child} currentPath={currentPath} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
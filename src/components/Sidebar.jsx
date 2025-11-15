import LogoArea from "./LogoArea";

export default function Sidebar({ config }) {
  const { logo, menuItems, footerItems } = config;

  return (
    <div className="h-screen w-48 sm:w-56 lg:w-60 bg-[#1E2A38] text-yellow-400 flex flex-col flex-shrink-0">
      {/* Logo Area */}
      <LogoArea logo={logo} />

      {/* Menu */}
      <div className="flex flex-col flex-1 mt-4 sm:mt-6 gap-3 sm:gap-4 px-3 sm:px-4 text-xs sm:text-sm overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Icon size={16} className="sm:w-[18px]" />
              <span className="truncate">{item.label}</span>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-700 flex-shrink-0 overflow-x-auto cursor-pointer">
        {footerItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              onClick={item.onClick}
              href={item.href}
              className="flex items-center gap-1 hover:text-white transition-colors flex-shrink-0"
              title={item.label}
            >
              <Icon size={16} className="sm:w-[18px]" />
              <span className="hidden sm:inline text-xs sm:text-sm truncate">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
import LogoArea from "./LogoArea";

export default function Sidebar({ config }) {
  const { logo, menuItems, footerItems } = config;

  return (
    <div className="h-screen w-60 bg-[#1E2A38] text-yellow-400 flex flex-col">
      {/* Logo Area (dynamic) */}
      <LogoArea logo={logo} />

      {/* Menu */}
      <div className="flex flex-col flex-1 mt-6 gap-4 px-4 text-sm">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="h-12 flex items-center px-4 border-t border-gray-700">
        {footerItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

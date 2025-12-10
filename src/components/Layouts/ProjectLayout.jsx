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
        {
          label: "Check Lists and Certificates",
          icon: LogIn,
          href: "/checklist-certificates",
          subItems: [
            {
              label: "1 - GENERAL",
              icon: LogIn,
              href: "/checklist/general",
              children: []
            },
            {
              label: "2 - HULL AND STRUCTURE",
              icon: LogIn,
              href: "/checklist/hull",
              children: [
                { label: "201 - HULL MATERIALS", icon: LogIn, href: "/checklist/hull/201" },
                { label: "247 - STL Compartment and Cone", icon: LogIn, href: "/checklist/hull/247" },
                { label: "249 - STL Buoy", icon: LogIn, href: "/checklist/hull/249" },
                { label: "262 - BOTTOM PLUGS, SEA CHESTS...", icon: LogIn, href: "/checklist/hull/262" },
                { label: "278 - EXTERNAL CATHODIC PROTECTION", icon: LogIn, href: "/checklist/hull/278" },
                { label: "281 - ACCOMMODATION, DECK HOUSES...", icon: LogIn, href: "/checklist/hull/281" },
                { label: "282 - ENGINE, BOILER AND PUMP ROOMS", icon: LogIn, href: "/checklist/hull/282" },
                { label: "284 - CARGO TANKS", icon: LogIn, href: "/checklist/hull/284" },
                { label: "285 - BALLAST, SEA W.", icon: LogIn, href: "/checklist/hull/285" },
                { label: "286 - FRESH WATER TANKS", icon: LogIn, href: "/checklist/hull/286" },
                { label: "287 - FUEL OIL AND LUBE TANKS", icon: LogIn, href: "/checklist/hull/287" },
                { label: "288 - INTERNAL CATHODIC PROTECTION", icon: LogIn, href: "/checklist/hull/288" },
              ]
            },
            {
              label: "3 - EQUIPMENT FOR CARGO",
              icon: LogIn,
              href: "/checklist/cargo",
              children: [
                { label: "324 - BULLDOZERS, MECHANICAL SHOVELS, TRUCKS", icon: LogIn, href: "/checklist/cargo/324" },
                { label: "331 - ROTATING CRANES W/CRANE PILLARS", icon: LogIn, href: "/checklist/cargo/331" },
                { label: "351 - LOADING/DISCHARGING PUMPS", icon: LogIn, href: "/checklist/cargo/351" },
                { label: "352 - LOADING/DISCHARGING SYSTEMS ON DECK", icon: LogIn, href: "/checklist/cargo/352" },
                { label: "353 - LOADING/DISCHARGING SYSTEMS IN PUMPROOMS", icon: LogIn, href: "/checklist/cargo/353" },
                { label: "358 - STL FLUID TRANSFER SYSTEM", icon: LogIn, href: "/checklist/cargo/358" },
                { label: "365 - INDIRECT COOLING/HEATING SYSTEMS, CARGO", icon: LogIn, href: "/checklist/cargo/365" },
                { label: "376 - INERT GAS SYSTEMS W/CONDITIONING PLANTS", icon: LogIn, href: "/checklist/cargo/376" },
                { label: "381 - SOUNDING, SURVEIL. AND OPERATING EQUIP.", icon: LogIn, href: "/checklist/cargo/381" },
                { label: "382 - TANK CLEANING SYSTEMS AND EQUIPMENT", icon: LogIn, href: "/checklist/cargo/382" },
              ]
            },
            {
              label: "4 - SHIP EQUIPMENT",
              icon: LogIn,
              href: "/checklist/ship-equipment",
              children: []
            }
          ]
        },
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

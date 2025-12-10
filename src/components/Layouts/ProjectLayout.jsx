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
          icon: LogIn,          // Replaces P.png
          href: "/checklist-certificates",
          subItems: [
            {
              label: "1 - GENERAL",
              icon: LogIn,       // Replaces S-black
              href: "/workingpage",
              children: []
            },
            {
              label: "2 - HULL AND STRUCTURE",
              icon: LogIn,       // Replaces S-green
              href: "/workingpage",
              children: [
                { label: "201 - HULL MATERIALS", icon: LogIn, href: "/workingpage" },
                { label: "247 - STL Compartment and Cone", icon: LogIn, href: "/workingpage" },
                { label: "249 - STL Buoy", icon: LogIn, href: "/workingpage" },
                { label: "262 - BOTTOM PLUGS, SEA CHESTS...", icon: LogIn, href: "/workingpage" },
                { label: "278 - EXTERNAL CATHODIC PROTECTION", icon: LogIn, href: "/workingpage" },
                { label: "281 - ACCOMMODATION, DECK HOUSES...", icon: LogIn, href: "/workingpage" },
                { label: "282 - ENGINE, BOILER AND PUMP ROOMS", icon: LogIn, href: "/workingpage" },
                { label: "284 - CARGO TANKS", icon: LogIn, href: "/workingpage" },
                { label: "285 - BALLAST, SEA W.", icon: LogIn, href: "/workingpage" },
                { label: "286 - FRESH WATER TANKS", icon: LogIn, href: "/workingpage" },
                { label: "287 - FUEL OIL AND LUBE TANKS", icon: LogIn, href: "/workingpage" },
                { label: "288 - INTERNAL CATHODIC PROTECTION", icon: LogIn, href: "/workingpage" },
              ]
            },
            {
              label: "3 - EQUIPMENT FOR CARGO",
              icon: LogIn,
              href: "/workingpage",
              children: [
                { label: "324 - BULLDOZERS, MECHANICAL SHOVELS, TRUCKS", href: "/workingpage" },
                { label: "331 - ROTATING CRANES W/CRANE PILLARS", href: "/workingpage" },
                { label: "351 - LOADING/DISCHARGING PUMPS", href: "/workingpage" },
                { label: "352 - LOADING/DISCHARGING SYSTEMS ON DECK", href: "/workingpage" },
                { label: "353 - LOADING/DISCHARGING SYSTEMS IN PUMPROOMS", href: "/workingpage" },
                { label: "358 - STL FLUID TRANSFER SYSTEM", href: "/workingpage" },
                { label: "365 - INDIRECT COOLING/HEATING SYSTEMS, CARGO", href: "/workingpage" },
                { label: "376 - INERT GAS SYSTEMS W/CONDITIONING PLANTS", href: "/workingpage" },
                { label: "381 - SOUNDING, SURVEIL. AND OPERATING EQUIP.", href: "/workingpage" },
                { label: "382 - TANK CLEANING SYSTEMS AND EQUIPMENT", href: "/workingpage" }
              ]
            },
            {
              label: "4 - SHIP EQUIPMENT",
              icon: LogIn,
              href: "/workingpage",
              children: [
                 { label: "404 - SIDE THRUSTERS", href: "/workingpage" },
              ]
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

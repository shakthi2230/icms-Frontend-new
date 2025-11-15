import { useRoutes } from "react-router-dom";

import { homeRoutes } from "./routes/homeRoutes";
import { adminLoginRoutes } from "./routes/adminLoginRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { projectLoginRoutes } from "./routes/projectLoginRoutes";
import { projectRoutes } from "./routes/projectRoutes";

export default function AppRoutes() {
  const routes = useRoutes([
    ...homeRoutes,
    ...adminLoginRoutes,
    ...adminRoutes,
    ...projectLoginRoutes,
    ...projectRoutes,
  ]);

  return routes;
}

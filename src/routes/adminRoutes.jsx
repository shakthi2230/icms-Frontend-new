import { lazy, Suspense } from "react";
import AdminLayout from "../components/Layouts/AdminLayout";
import AdminDashboard from "../pages/admin-pages/AdminDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

const AddNewCompany = lazy(() => import("../pages/admin-pages/AddNewCompany"));
const CreateNewUser = lazy(() => import("../pages/admin-pages/CreateNewUser"));
const AddNewProject = lazy(() => import("../pages/admin-pages/AddNewProject"));
const GenerateReport = lazy(() => import("../pages/admin-pages/GenerateReport"));

export const adminRoutes = [
  {
    path: "/admin-dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },

      ...[
        { path: "add-company", component: AddNewCompany },
        { path: "create-user", component: CreateNewUser },
        { path: "add-project", component: AddNewProject },
        { path: "generate-report", component: GenerateReport },
      ].map(({ path, component: Component }) => ({
        path,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Component />
          </Suspense>
        ),
      })),
    ],
  },
];

import { lazy, Suspense } from "react";
import AdminLayout from "../components/Layouts/AdminLayout";
import AdminDashboard from "../pages/admin-pages/AdminDashboard";
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "../context/ProtectedRoute"; 

const AddNewCompany = lazy(() => import("../pages/admin-pages/AddNewCompany"));
const CreateNewUser = lazy(() => import("../pages/admin-pages/CreateNewUser"));
const AddNewProject = lazy(() => import("../pages/admin-pages/AddNewProject"));
const GenerateReport = lazy(() => import("../pages/admin-pages/GenerateReport"));

export const adminRoutes = [
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { 
        index: true, 
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ) 
      },

      ...[
        { path: "add-company", component: AddNewCompany },
        { path: "create-user", component: CreateNewUser },
        { path: "add-project", component: AddNewProject },
        { path: "generate-report", component: GenerateReport },
      ].map(({ path, component: Component }) => ({
        path,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Component />
            </Suspense>
          </ProtectedRoute>
        ),
      })),
    ],
  },
];
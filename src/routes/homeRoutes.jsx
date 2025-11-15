import HomeLayout from "../components/Layouts/HomeLayout";
import Home from "../pages/Home";

export const homeRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ index: true, element: <Home /> }],
  },
];

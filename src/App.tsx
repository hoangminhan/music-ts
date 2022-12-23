import "antd/dist/reset.css";
import { lazy } from "react";
import "./App.css";
import { PrivateRoute } from "component/common";
import { DefaultLayout } from "layout";
import Demo from "pages/demo";
import { useRoutes } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const LoginPage = lazy(() => import("auth/pages/LoginPage"));
const NotFoundPage = lazy(() => import("pages/not-found"));
const HomePage = lazy(() => import("pages/home-page"));

const routes = [
  { path: "*", element: <NotFoundPage /> },
  {
    path: "/",
    element: (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
  },
  {
    path: "/demo",
    element: (
      <DefaultLayout>
        <Demo />
      </DefaultLayout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

function App() {
  let mainContent = useRoutes(routes);
  return <div className="overflow-hidden">{mainContent}</div>;
  // return (
  //   <Routes>
  //     {/* not found */}
  //     <Route path="*" element={<NotFoundPage />} />

  //     <Route path="/" element={<HomePage />} />

  //     <Route
  //       path="/demo"
  //       element={
  //         <PrivateRoute>
  //           <Demo />
  //         </PrivateRoute>
  //       }
  //     />

  //     <Route path="/login" element={<LoginPage />} />
  //   </Routes>
  // );
}

export default App;

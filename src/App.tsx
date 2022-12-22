import "antd/dist/reset.css";

import { useAppDispatch } from "app/store";
import { getListMusicAsyncThunk } from "features/home-page";
import { lazy, useEffect } from "react";
import "./App.css";

import { PrivateRoute } from "component/common";
import { DefaultLayout } from "layout";
import Demo from "pages/demo";
import { useRoutes } from "react-router-dom";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getListMusicAsyncThunk({
        typeMusic: "trending",
        params: { _limit: 20 },
      })
    );
  }, [dispatch]);

  let mainContent = useRoutes(routes);
  return <div>{mainContent}</div>;
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

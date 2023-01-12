import "antd/dist/reset.css";
import React, { lazy } from "react";
import "./App.css";
import { PrivateRoute } from "component/common";
import { DefaultLayout } from "layout";

import { useRoutes } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ModalApp from "modals";
import { firebaseApp } from "FirebaseMusic";

const NotFoundPage = lazy(() => import("pages/not-found"));
const HomePage = lazy(() => import("pages/home-page"));
const FavoritePage = lazy(() => import("pages/Favorite"));
const MuisicListened = lazy(() => import("pages/MusicListened"));
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
    path: "/favorites",
    element: (
      <DefaultLayout>
        <FavoritePage />
      </DefaultLayout>
    ),
  },
  {
    path: "/listened",
    element: (
      <DefaultLayout>
        <MuisicListened />
      </DefaultLayout>
    ),
  },
];

function App() {
  let mainContent = useRoutes(routes);

  return (
    <>
      <div className="overflow-hidden">{mainContent}</div>
      <ModalApp />
    </>
  );
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

import "antd/dist/reset.css";
import React, { lazy } from "react";
import "./App.css";
import { PrivateRoute } from "component/common";
import { DefaultLayout } from "layout";
import Demo from "pages/demo";
import { useRoutes } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ModalApp from "modals";
import { initializeApp } from "firebase/app";

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
  initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "music-ts-78b70.firebaseapp.com",
    projectId: "music-ts-78b70",
    storageBucket: "music-ts-78b70.appspot.com",
    messagingSenderId: "1024484832025",
    appId: "1:1024484832025:web:58785cc9ff85bbd7ad4b88",
    measurementId: "G-KB1PH2XKNW",
  });

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

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
import { collection, getDocs } from "firebase/firestore";
import { dbApp } from "./Firebase";

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
  React.useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(dbApp, "favorites"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    getData();
  }, []);

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

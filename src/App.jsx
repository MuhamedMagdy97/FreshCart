import React, { useEffect, useContext } from "react";
import Home from "./Component/Home/Home.jsx";
import Footer from "./Component/Footer/Footer.jsx";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import Brands from "./Component/Brands/Brands.jsx";
import Categories from "./Component/Categories/Categories.jsx";
import Products from "./Component/Products/Products.jsx";
import Register from "./Component/Register/Register.jsx";
import Login from "./Component/Login/Login.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserContext } from "./Context/UserContext.js";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "Register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

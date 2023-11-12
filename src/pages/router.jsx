import { createBrowserRouter } from "react-router-dom";
import { Registration, Login } from "./auth";
import Authentication from "../layouts/Authentication";
import Header from "../layouts/Header";
import Inventory from "./inventory";
import AddProduct from "./AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication/>,
    children: [
      {
        path: "/register",
        element: <Registration/>
      },
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/login",
        element: <Login/>
      },
    ],
  },
  {
    path: "/main",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Inventory />
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
    ]
  }
]);

export default router;
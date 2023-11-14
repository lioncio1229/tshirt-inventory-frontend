import { createBrowserRouter } from "react-router-dom";
import { Registration, Login } from "./auth";
import Authentication from "../layouts/Authentication";
import Header from "../layouts/Header";
import Inventory from "./inventory";
import AddProduct from "./add-product";
import EditProduct from "./edit-product";
import ManageUsers from "./manage_users";

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
      {
        path: "edit-product/:id",
        element: <EditProduct />
      },
      {
        path: "manage-users",
        element: <ManageUsers />
      }
    ]
  }
]);

export default router;
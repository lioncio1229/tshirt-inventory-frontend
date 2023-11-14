import { createBrowserRouter } from "react-router-dom";
import { Registration, Login } from "./auth";
import Authentication from "../layouts/Authentication";
import Header from "../layouts/Header";
import Inventory from "./inventory";
import AddProduct from "./add_product";
import EditProduct from "./edit_product";
import ManageUsers from "./manage_users";
import AddUser from "./add_user";
import EditUser from "./edit_user";

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
      },
      {
        path: "manage-users/add",
        element: <AddUser />
      },
      {
        path: "manage-users/edit/:id",
        element: <EditUser />
      },
    ]
  }
]);

export default router;
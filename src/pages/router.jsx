import { createBrowserRouter } from "react-router-dom";
import { Registration, Login } from "./auth";
import Authentication from "../layouts/Authentication";

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
    ]
  }
]);

export default router;
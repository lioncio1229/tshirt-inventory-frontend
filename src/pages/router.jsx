import { createBrowserRouter } from "react-router-dom";
import { Registration } from "./auth";
import Authentication from "../layouts/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication/>,
    children: [
      {
        path: "/register",
        element: <Registration/>
      }
    ]
  }
]);

export default router;
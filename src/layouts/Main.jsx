import Header from "./Header"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {Box} from "@mui/material";

export default function Main()
{
    const navigate = useNavigate();
    const location = useLocation();

    const pages = [
        {
          label: "Inventory",
          isEnabled: true,
          pathName: "/main",
        },
        {
          label: "Sales",
          isEnabled: true,
          pathName: "/main/sales",
        },
        {
          label: "Report",
          isEnabled: false,
        },
        {
          label: "Manage Users",
          isEnabled: true,
          pathName: "/main/manage-users",
        },
      ];

    const handleTabClick = (page) => {
        navigate(page.pathName);
    }

    const removeTrailingSlash = (inputString) => {
        return inputString.replace(/\/$/, '');
    }

    return (
        <>
            <Header pages={pages} currentPathName={removeTrailingSlash(location.pathname)} onTabClick={handleTabClick}/>
            <Box mt={2} ml={3} mr={3}>
                <Outlet />
            </Box>
        </>
    )
}
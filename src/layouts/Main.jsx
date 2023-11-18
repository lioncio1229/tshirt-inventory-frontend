import { useMemo, useEffect } from "react";
import Header from "./Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (page) => {
    navigate(page.pathName);
  };

  const removeTrailingSlash = (inputString) => {
    return inputString.replace(/\/$/, "");
  };

  const pages = useMemo(() => {

    const allPage = [
      {
        label: "Inventory",
        pathName: "/main",
        roles: ["admin"],
      },
      {
        label: "Sales",
        pathName: "/main/sales",
        roles: ["admin", "sales"],
      },
      {
        label: "Report",
        isEnabled: false,
      },
      {
        label: "Manage Users",
        pathName: "/main/manage-users",
        roles: ["admin"],
      },
    ];

    const token = localStorage.getItem("token");

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role.toLowerCase();
      return allPage.filter((page) => page.roles && page.roles.includes(role));
    } catch (e) {
      console.error(e);
    }

    return [];
  }, []);

  useEffect(() => {
    if(pages.length <= 0)
    {
      navigate("/main/prohibited");
      return;
    }

    navigate(pages[0].pathName)

  }, [pages]);

  return (
    <>
      <Header
        pages={pages}
        currentPathName={removeTrailingSlash(location.pathname)}
        onTabClick={handleTabClick}
      />
      <Box mt={2} ml={3} mr={3}>
        <Outlet />
      </Box>
    </>
  );
}

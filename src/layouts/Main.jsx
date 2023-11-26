import { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { barLoadingSelector } from "../globalSlice";
import { useSelector } from "react-redux";

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const isBarLoading = useSelector((state) => barLoadingSelector(state));

  const handleTabClick = (page) => {
    navigate(page.pathName);
  };

  const removeTrailingSlash = (inputString) => {
    return inputString.replace(/\/$/, "");
  };

  useEffect(() => {
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
        pathName: "/main/reports",
        roles: ["admin", "report"],
      },
      {
        label: "Manage Users",
        pathName: "/main/manage-users",
        roles: ["admin"],
      },
    ];

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role.toLowerCase();
      const selectedPages = allPage.filter(
        (page) => page.roles && page.roles.includes(role)
      );

      if (selectedPages.length > 0) {
        setPages(selectedPages);
        let currentPath = selectedPages.find(
          (page) => page.pathName === removeTrailingSlash(location.pathname)
        );

        if (!currentPath) {
          currentPath = selectedPages[0];
        }

        navigate(currentPath.pathName);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {isBarLoading && (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: "modal",
          }}
        >
          <LinearProgress />
        </Box>
      )}
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

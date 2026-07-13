"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import useSession from "@/hooks/session/useSession";
import useLogout from "@/hooks/session/useLogout";

export default function MenuButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { sessionUser, status } = useSession();
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (status === "error") throw new Error("Error getting session");

  const pages = [
    { name: "Home", path: "/" },
    { name: "Log in", path: "/login", showIfLoggedOut: true },
    { name: "Sign up", path: "/signup", showIfLoggedOut: true },
  ].filter((page) => {
    if (!page.showIfLoggedOut) return true;
    if (status === "pending" || sessionUser) return false; // Hide login/signup while loading session or if logged out
    return true;
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = async (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
    handleClose();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {pages.map((page) => (
          <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
            {page.name}
          </MenuItem>
        ))}
        {sessionUser && <MenuItem onClick={handleLogout}>Log out</MenuItem>}
      </Menu>
    </>
  );
}

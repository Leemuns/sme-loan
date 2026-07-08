"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function MenuButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Log in", path: "/login" },
    { name: "Sign up", path: "/signup" },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    if (pathname !== path) {
      router.push(path);
    }
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
      </Menu>
    </>
  );
}

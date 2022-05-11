import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import { useUpdateUserName, useUserName } from "../UserContext";

export function Header() {
  const settings = [
    { title: "Profilis", path: "/" },
    { title: "Skelbimai", path: "/admin" },
    { title: "Užsakymai", path: "/admin/orders" },
    { title: "Atsijungti", path: "/logout" },
  ];

  const username = useUserName();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className="AppBar"
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="textPrimary"
              className="PaslaugosButton"
              style={{ textDecoration: "none" }}
            >
              Paslaugos
            </Link>
          </Typography>
          {username ? (
            <React.Fragment>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Image"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          href="#"
                          style={{ textDecoration: "none" }}
                          to={setting.path}
                        >
                          {setting.title}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </React.Fragment>
          ) : (
            <Button
              href="#"
              color="red"
              variant="secondary"
              className="LoginButton"
              component={NavLink}
              to="/login"
            >
              Prisijungti
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

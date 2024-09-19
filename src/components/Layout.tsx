import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, MouseEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserProfile } from "src/apis/user";

const drawerWidth = 240;

export default function Layout() {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    select: (data) => data.data,
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const avatarUrl = data?.profileImageUrl;
  const userName = data?.name;

  const logout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Kasmo Admin
            </Typography>
          </Toolbar>
        </Link>
        {/* {data && (
          <Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt={userName} src={avatarUrl} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {userName}
            </Typography>
          </Box>
        )} */}
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          bgcolor: "background.white",
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <ListItemButton component="a" href="/user">
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/post">
                <ListItemText primary="Post" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/company">
                <ListItemText primary="Company" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/banner">
                <ListItemText primary="Banner" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
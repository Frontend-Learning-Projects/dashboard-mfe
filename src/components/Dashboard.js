import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

import {
  Home as HomeIcon,
  Group as UsersIcon,
  Folder as FolderIcon,
  CalendarToday as CalendarIcon,
  Description as DocumentIcon,
  PieChart as ReportIcon,
} from "@mui/icons-material";

import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const drawerWidth = 240;

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: <HomeIcon />,
    component: <div>Dashboard Content</div>,
  },
  {
    name: "Teams",
    path: "/team",
    icon: <UsersIcon />,
    component: <div>Teams Content</div>,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <FolderIcon />,
    component: <div>Projects Content</div>,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: <CalendarIcon />,
    component: <div>Calendar Content</div>,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: <DocumentIcon />,
    component: <div>Documents Content</div>,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <ReportIcon />,
    component: <div>Reports Content</div>,
  },
];

const DashboardScreen = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My App
      </Typography>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.path}
            selected={item.path === location.pathname}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          <Box sx={{ position: "relative", mr: 2 }}>
            <SearchIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                color: "gray",
              }}
            />
            <InputBase
              placeholder="Search..."
              sx={{
                pl: 5,
                pr: 2,
                py: 0.5,
                backgroundColor: "#f1f3f4",
                borderRadius: 2,
                fontSize: "0.875rem",
              }}
            />
          </Box>

          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenuOpen}>
            <Avatar alt="John Doe" src="https://i.pravatar.cc/300" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Routes>
          {navigation.map((item) => (
            <Route key={item.path} path={item.path} element={item.component} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
};
export default DashboardScreen;

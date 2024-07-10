import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Anchor = "left";

type MenuItem = {
  text: string;
  path?: string;
  icon: JSX.Element;
};

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const HeaderTypography = ({ text }: { text: string }) => (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{
        fontSize: "0.85rem",
        paddingLeft: "1rem",
        color: "#999",
      }}
    >
      {text}
    </Typography>
  );

  const menuItems: Record<string, MenuItem[]> = {
    MAIN: [
      {
        text: "Dashboard",
        path: "/admin",
        icon: <DashboardIcon sx={{ color: "#7451f8" }} />,
      },
    ],
    LISTS: [
      {
        text: "Customers",
        path: "/admin/customers",
        icon: <PersonOutlineIcon sx={{ color: "#7451f8" }} />,
      },
      {
        text: "Categories",
        path: "/admin/categories",
        icon: <CategoryIcon sx={{ color: "#7451f8" }} />,
      },
      {
        text: "Products",
        path: "/admin/products",
        icon: <StoreIcon sx={{ color: "#7451f8" }} />,
      },
      {
        text: "Orders",
        path: "/admin/orders",
        icon: <CreditCardIcon sx={{ color: "#7451f8" }} />,
      },
    ],
    USEFUL: [
      {
        text: "Stats",
        path: "/admin/stats",
        icon: <InsertChartIcon sx={{ color: "#7451f8" }} />,
      },
      {
        text: "Notifications",
        path: "/admin/notifications",
        icon: <NotificationsNoneIcon sx={{ color: "#7451f8" }} />,
      },
    ],
    USER: [
      {
        text: "Profile",
        path: "/admin/profile",
        icon: <AccountCircleOutlinedIcon sx={{ color: "#7451f8" }} />,
      },
      { text: "Logout", icon: <ExitToAppIcon sx={{ color: "#7451f8" }} /> },
    ],
  };

  const headers = ["MAIN", "LISTS", "USEFUL", "USER"];

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "left" ? 250 : "auto",
        bgcolor: "#F5F5F5",
        height: "100vh",
        overflow: "auto",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {headers.map((header) => (
        <List key={header}>
          <HeaderTypography text={header} />
          {menuItems[header].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => item.path && navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ))}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", !state.left)}
          style={{
            position: "absolute",
            left: 3,
            top: 3,
            color: "black",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

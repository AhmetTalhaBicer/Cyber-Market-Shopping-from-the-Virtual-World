import { Box, IconButton, InputBase, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Topbar = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderRadius: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        borderRadius="50px"
        pl={2}
        pr={1}
        py={0.2}
        sx={{
          border: 1,
          borderColor: "gray",
        }}
      >
        <SearchIcon color="action" />
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
      </Box>

      {/* ICONS */}
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={1}
        position="fixed"
        right={0}
      >
        <IconButton>
          <LanguageOutlinedIcon />
          <Typography variant="body1">English</Typography>
        </IconButton>
        <IconButton>
          <DarkModeOutlinedIcon />
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

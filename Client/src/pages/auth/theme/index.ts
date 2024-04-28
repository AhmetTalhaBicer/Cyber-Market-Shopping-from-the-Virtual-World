import { createTheme, styled } from "@mui/material/styles";
import backgroundImage from "../../../assets/login_Background.jpg";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // Koyu mavi
    },
    secondary: {
      main: "#c51162", // Koyu pembe
    },
    background: {
      default: "#ffffff", // Açık gri
      paper: "#ffffff", // Beyaz
    },
    text: {
      primary: "#212121", // Çok koyu gri
      secondary: "#757575", // Koyu gri
    },
  },
});

export const Background = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  animation: "background-animation 5s infinite",
  "@media (max-width:600px)": {
    backgroundImage: `url(${backgroundImage})`,
  },
  "@keyframes background-animation": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.7,
    },
    "100%": {
      opacity: 1,
    },
  },
});

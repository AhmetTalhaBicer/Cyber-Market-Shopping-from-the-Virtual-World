import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const StyledCircularProgress = styled(CircularProgress)({
  color: "#ff6f00",
});

export default function LoadingModal() {
  return (
    <StyledBox>
      <StyledCircularProgress />
    </StyledBox>
  );
}

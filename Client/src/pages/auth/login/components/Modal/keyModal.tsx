import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useState } from "react";
import { useAuth } from "../../../../../context/authContext";
import { Backdrop, TextField } from "@mui/material";

interface KeyModalProps {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  secretKey: any; // Secret key to display
}

const KeyModal: React.FC<KeyModalProps> = ({ open, onClose, secretKey }) => {
  const { validate2FA } = useAuth();
  const [validateCode, setValidateCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const isValid = await validate2FA({ validateCode: validateCode }); // Kullanıcı tarafından girilen kodu validate2FA fonksiyonu ile doğrula
      if (isValid) {
        // Eğer doğrulama başarılı ise modalı kapat
        onClose();
      } else {
        setErrorMessage("Invalid authentication code"); // Geçersiz kod hatası mesajını göster
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setErrorMessage("An error occurred while validating the code");
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(secretKey.secret);
  };

  return (
    <Modal
      component="div"
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ onClick: () => {} }}
      aria-labelledby="key-modal"
      aria-describedby="key-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "80vw",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          transition: "transform 0.3s ease-in-out",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          "&:hover": {
            transform: "translate(-50%, -50%) scale(1.05)",
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            fontStyle: "italic",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Use this key along with an application like Google Authenticator to
          generate your login codes.
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          Secret Key:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#002884",
            fontSize: "1.2em",
            border: "1px solid",
            borderColor: "primary.dark",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {secretKey.secret}
        </Typography>
        <Button
          onClick={handleCopyKey}
          variant="contained"
          color="primary"
          startIcon={<FileCopyIcon />}
          sx={{ mb: 2, fontSize: "1.2em" }}
        >
          Copy
        </Button>
        <TextField
          label="Authentication Code"
          value={validateCode}
          onChange={(e) => setValidateCode(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2, color: "#00ff00" }}
        >
          Validate
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ color: "#00ff00" }} // Apply styles directly
        >
          Close
        </Button>
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default KeyModal;

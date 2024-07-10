import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ModalProps {
  title: string;
  content: React.ReactNode;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
}

const ParentModal: React.FC<ModalProps> = ({
  title,
  content,
  visible,
  onCancel,
  onConfirm,
  confirmLoading,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <Dialog open={visible} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "#383838",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
          lineHeight: "24px",
          padding: "12px 24px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: "24px" }}>
        <Typography
          sx={{
            marginBottom: "16px",
            fontSize: "14px",
            lineHeight: "24px",
            color: "#383838",
            fontWeight: "normal",
            textAlign: "left",
          }}
        >
          {content}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Button
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#383838",
            borderColor: "#383838",
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              color: "#383838",
              borderColor: "#383838",
            },
          }}
          onClick={onCancel}
        >
          {cancelButtonText}
        </Button>
        <Button
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            backgroundColor: "#383838",
            color: "#fff",
            borderColor: "#383838",
            boxShadow: "0px 4px 8px 0 #383838",
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
              borderColor: "#000",
            },
          }}
          onClick={onConfirm}
          disabled={confirmLoading}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParentModal;

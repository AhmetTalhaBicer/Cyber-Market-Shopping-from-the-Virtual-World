import React, { useState } from "react";
import ParentModal from "../../../modal";
import { TextField, Box } from "@mui/material";

interface AddCategoryModalProps {
  visible: boolean;
  onConfirm: (name: string, imageUrl: string) => void;
  onCancel: () => void;
  confirmLoading: boolean;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  confirmLoading,
}) => {
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleConfirm = () => {
    onConfirm(name, imageUrl);

    setName("");
    setImageUrl("");
  };

  return (
    <ParentModal
      title="Add Category"
      visible={visible}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      confirmButtonText="Add"
      cancelButtonText="Cancel"
      content={
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Box>
      }
    />
  );
};

export default AddCategoryModal;

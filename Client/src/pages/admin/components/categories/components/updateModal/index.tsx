import React, { useState } from "react";
import ParentModal from "../../../modal";
import { TextField, Box } from "@mui/material";

interface UpdateCategoryModalProps {
  visible: boolean;
  onUpdate: (name: string, imageUrl: string) => void;
  onCancel: () => void;
  confirmLoading: boolean;
  initialName: string;
  initialImageUrl: string;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  visible,
  onUpdate,
  onCancel,
  confirmLoading,
  initialName,
  initialImageUrl,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);

  const handleUpdate = () => {
    onUpdate(name, imageUrl);

    setName(initialName);
    setImageUrl(initialImageUrl);
  };

  return (
    <ParentModal
      title="Update Category"
      visible={visible}
      onConfirm={handleUpdate}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      confirmButtonText="Update"
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

export default UpdateCategoryModal;

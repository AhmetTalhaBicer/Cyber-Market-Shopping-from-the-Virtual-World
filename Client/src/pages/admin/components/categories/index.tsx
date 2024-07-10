import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../../../services/api-services/category/endpoints";
import { useQuery, useQueryClient } from "react-query";
import LoadingModal from "../../../../components/common/Loading";
import { categoryStore } from "../../../../store/admin/categories/categoryStore";
import { useMutation } from "react-query";
import AddCategoryModal from "./components/addModal";
import { useState } from "react";
import { categoryUpdateDTO } from "../../../../services/api-services/category/types";
import UpdateCategoryModal from "./components/updateModal";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const queryClient = useQueryClient();
  const createMutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { setRows, setRowModesModel } = props;

  const handleNewCategory = async (name: string, imageUrl: string) => {
    const id = randomId();
    const newCategory = { name, image_url: imageUrl };
    await createMutation.mutateAsync(newCategory);
    setRows((oldRows) => [...oldRows, { id, ...newCategory, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
    setAddModalOpen(false);
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setAddModalOpen(true)}
      >
        Add new category
      </Button>
      <AddCategoryModal
        visible={isAddModalOpen}
        onConfirm={handleNewCategory}
        onCancel={() => setAddModalOpen(false)}
        confirmLoading={createMutation.isLoading}
      />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { data: categories, isLoading } = useQuery(
    "categories",
    getAllCategories
  );

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });

  const updateMutation = useMutation(
    ({ data, category_id }: { data: categoryUpdateDTO; category_id: number }) =>
      updateCategory(category_id, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("categories");
        // Update the local state with the updated category
        setRows(
          rows.map((row) =>
            row.id === variables.category_id
              ? { ...row, ...variables.data }
              : row
          )
        );
      },
    }
  );
  const rows = categoryStore((state) => state.rows);
  const setRows = categoryStore((state) => state.setRows);
  const rowModesModel = categoryStore((state) => state.rowModesModel);
  const setRowModesModel = categoryStore((state) => state.setRowModesModel);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteMutation.mutateAsync(Number(id));
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleUpdateClick =
    (id: GridRowId, data: { name: string; image_url: string }) => async () => {
      try {
        await updateMutation.mutateAsync({
          data,
          category_id: Number(id),
        });
        setUpdateModalOpen(false);
      } catch (error) {
        console.error("Failed to update category", error);
      }
    };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "image_url",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value as string}
          alt=""
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => setUpdateModalOpen(true)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={categories?.data.result || []}
        columns={columns}
        getRowId={(row) => row.category_id}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

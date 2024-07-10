// store.ts
import { GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { create } from "zustand";

type Store = {
  rows: GridRowsProp;
  setRows: (newRows: GridRowsProp) => void;
  rowModesModel: GridRowModesModel;
  setRowModesModel: (newModel: GridRowModesModel) => void;
};

const initialRows: GridRowsProp = [
  {
    id: randomId(),
  },
];
export const categoryStore = create<Store>((set) => ({
  rows: initialRows,
  setRows: (newRows) => set({ rows: newRows }),
  rowModesModel: {},
  setRowModesModel: (newModel) => set({ rowModesModel: newModel }),
}));

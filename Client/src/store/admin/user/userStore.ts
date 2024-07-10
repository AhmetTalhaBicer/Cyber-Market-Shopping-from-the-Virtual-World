// store.ts
import { create } from "zustand";
import { UsersDTO } from "../../../services/api-services/auth/users/types";

type State = {
  users: UsersDTO[];
  setUsers: (users: UsersDTO[]) => void;
};

export const userStore = create<State>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

import http from "../../../base";
import { ServerResponse } from "../../../base/types";
import { User } from "./constants";
import { UsersDTO } from "./types";

export const getUsers = async () => {
  return http.get<ServerResponse<UsersDTO[]>>(User);
};

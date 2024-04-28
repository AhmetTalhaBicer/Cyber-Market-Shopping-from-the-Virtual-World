import http from "../../../base";
import { ServerResponse } from "../../../base/types";
import { User } from "./constants";
import { UsersDTO } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsers = async ({ queryKey }: any) => {
  const { params } = queryKey[1];
  const response = await http.get<ServerResponse<UsersDTO>>(User, {
    params,
  });
  return response;
};

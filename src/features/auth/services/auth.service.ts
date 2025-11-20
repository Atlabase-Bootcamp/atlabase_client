import api from "@/lib/axios";
import type { IUser, IApiResponse } from "@/types";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

type LoginResponseData = string;

export const authService = {
  login: async (credentials: LoginInput) => {
    const { data } = await api.post<IApiResponse<LoginResponseData>>(
      "/auth/login",
      credentials
    );
    return data.data;
  },

  register: async (credentials: RegisterInput) => {
    const { data } = await api.post<IApiResponse<IUser>>(
      "/auth/register",
      credentials
    );
    return data.data;
  },
};

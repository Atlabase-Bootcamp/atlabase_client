import api from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { User } from "./auth.type";
import type { LoginInput, RegisterInput } from "./auth.schema";

type LoginResponseData = string;

export const authService = {
  login: async (credentials: LoginInput) => {
    const { data } = await api.post<ApiResponse<LoginResponseData>>(
      "/auth/login",
      credentials
    );
    return data.data;
  },

  register: async (credentials: RegisterInput) => {
    const { data } = await api.post<ApiResponse<User>>(
      "/auth/register",
      credentials
    );
    return data.data;
  },
};

import api from "@/lib/axios";
import { Project } from "./project.type";
import { ApiResponse } from "@/types";

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get<ApiResponse<Project[]>>("/projects");
    return data.data;
  },
};

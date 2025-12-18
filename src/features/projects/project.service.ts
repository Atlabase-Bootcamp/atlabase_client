import api from "@/lib/axios";
import {
  CreateProjectInput,
  Project,
  Task,
  UpdateTaskInput,
} from "./project.type";
import { ApiResponse } from "@/types";
import { CreateTaskInput } from "./project.type";

const projectService = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get<ApiResponse<Project[]>>("/projects");
    return data.data;
  },
  getById: async (id: string): Promise<Project> => {
    const { data } = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return data.data;
  },
  create: async (newProject: CreateProjectInput): Promise<Project> => {
    const { data } = await api.post<ApiResponse<Project>>(
      "/projects",
      newProject
    );
    return data.data;
  },
  createTask: async (
    projectId: string,
    task: CreateTaskInput
  ): Promise<Task> => {
    const { data } = await api.post<ApiResponse<Task>>(
      `/projects/${projectId}/tasks`,
      task
    );
    return data.data;
  },
  updateTask: async (
    projectId: string,
    taskId: string,
    updates: UpdateTaskInput
  ): Promise<Task> => {
    const { data } = await api.put<ApiResponse<Task>>(
      `/projects/${projectId}/tasks/${taskId}`,
      updates
    );
    return data.data;
  },
};

export { projectService };

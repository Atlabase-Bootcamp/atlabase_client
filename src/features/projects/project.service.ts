import api from "@/lib/axios";
import { Project, Task, UpdateTaskInput } from "./project.type";
import { ApiResponse } from "@/types";
import { CreateTaskInput } from "./project.type";
import { UpdateProjectInput, CreateProjectInput } from "./project.schema";

const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<ApiResponse<Project[]>>("/projects");
    return response.data.data;
  },
  getById: async (id: string): Promise<Project> => {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },
  create: async (newProject: CreateProjectInput): Promise<Project> => {
    const response = await api.post<ApiResponse<Project>>(
      "/projects",
      newProject
    );
    return response.data.data;
  },
  update: async (
    projectId: string,
    updates: UpdateProjectInput
  ): Promise<Project> => {
    const response = await api.put<ApiResponse<Project>>(
      `/projects/${projectId}`,
      updates
    );
    return response.data.data;
  },
  delete: async (projectId: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(
      `/projects/${projectId}`
    );
    return response.data.data;
  },
  createTask: async (
    projectId: string,
    task: CreateTaskInput
  ): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>(
      `/projects/${projectId}/tasks`,
      task
    );
    return response.data.data;
  },
  updateTask: async (
    projectId: string,
    taskId: string,
    updates: UpdateTaskInput
  ): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(
      `/projects/${projectId}/tasks/${taskId}`,
      updates
    );
    return response.data.data;
  },
  deleteTask: async (projectId: string, taskId: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return response.data.data;
  },
};

export { projectService };

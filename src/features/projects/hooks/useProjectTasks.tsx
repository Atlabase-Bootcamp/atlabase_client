import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../project.service";
import toast from "react-hot-toast";
import { CreateTaskInput, UpdateTaskInput } from "../project.type";

const useProjectTasks = (projectId: string) => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskInput) =>
      projectService.createTask(projectId, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success("Tarea creada correctamente");
    },
    onError: () => {
      toast.error("Error al crear tarea");
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      isCompleted,
    }: {
      taskId: string;
      isCompleted: boolean;
    }) =>
      projectService.updateTask(projectId, taskId, {
        is_completed: isCompleted,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: () => {
      toast.error("No se pudo actualizar la tarea");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskInput }) =>
      projectService.updateTask(projectId, taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: () => {
      toast.error("No se pudo actualizar la tarea");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) =>
      projectService.deleteTask(projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      toast.success("Tarea eliminada");
    },
    onError: () => {
      toast.error("No se pudo eliminar la tarea");
    },
  });

  return {
    addTask: createTaskMutation,
    toggleTask: toggleTaskMutation,
    updateTask: updateTaskMutation,
    deleteTask: deleteTaskMutation,
  };
};

export { useProjectTasks };

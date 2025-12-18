import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../project.service";
import { customerService } from "@/features/customers/customer.service";
import { CreateProjectInput, UpdateProjectInput } from "../project.schema";
import toast from "react-hot-toast";

const useProjectMutations = () => {
  const queryClient = useQueryClient();

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (newProject: CreateProjectInput) =>
      projectService.create(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyecto creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el proyecto");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      projectId,
      updates,
    }: {
      projectId: string;
      updates: UpdateProjectInput;
    }) => projectService.update(projectId, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
      toast.success("Proyecto actualizado correctamente");
    },
    onError: () => {
      toast.error("Error al actualizar el proyecto");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => projectService.delete(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyecto Eliminado");
    },
    onError: () => {
      toast.error("Error al eliminar el proyecto.");
    },
  });

  return {
    customers: customersQuery.data || [],
    isLoadingCustomers: customersQuery.isLoading,
    createProject: createMutation,
    updateProject: updateMutation,
    deleteProject: deleteMutation,
  };
};

export { useProjectMutations };

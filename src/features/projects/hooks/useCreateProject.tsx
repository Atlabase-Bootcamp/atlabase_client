import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../project.service";
import { customerService } from "@/features/customers/customer.service";
import { CreateProjectInput } from "../project.type";
import toast from "react-hot-toast";

const useCreateProject = () => {
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
      toast.success("Projecto creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el proyecto");
    },
  });

  return {
    customers: customersQuery.data || [],
    isLoadingCustomers: customersQuery.isLoading,
    createProject: createMutation,
  };
};

export { useCreateProject };

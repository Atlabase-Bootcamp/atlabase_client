import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../customer.service";
import { CreateCustomerInput, UpdateCustomerInput } from "../customer.schema";
import toast from "react-hot-toast";

const useCustomers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCustomerInput) => customerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente registrado correctamente");
    },
    onError: () => {
      toast.error("Error al registrar cliente");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      customerId,
      updates,
    }: {
      customerId: string;
      updates: UpdateCustomerInput;
    }) => customerService.update(customerId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente actualizado");
    },
    onError: () => toast.error("Error al actualizar el cliente"),
  });

  const deleteMutation = useMutation({
    mutationFn: (customerId: string) => customerService.delete(customerId),
    onSuccess: () => {
      toast.success("Cliente eliminado correctamente");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      if (message?.includes("relations") || error?.response?.status === 500) {
        toast.error(
          "No se puede eliminar: El cliente tiene proyectos activos."
        );
      } else {
        toast.error("Error al eliminar el cliente.");
      }
    },
  });

  return {
    customers: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    createCustomer: createMutation,
    updateCustomer: updateMutation,
    deleteCustomer: deleteMutation,
  };
};

export { useCustomers };

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../customer.service";
import toast from "react-hot-toast";
import { CreateCustomerInput } from "../customer.types";

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

  return {
    customers: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    createCustomer: createMutation,
  };
};

export { useCustomers };

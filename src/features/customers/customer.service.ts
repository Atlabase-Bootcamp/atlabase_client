import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Customer } from "./customer.types";
import { CreateCustomerInput, UpdateCustomerInput } from "./customer.schema";

const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const response = await api.get<ApiResponse<Customer[]>>("/customers");
    return response.data.data;
  },
  create: async (customerData: CreateCustomerInput): Promise<Customer> => {
    const response = await api.post<ApiResponse<Customer>>(
      "/customers",
      customerData
    );
    return response.data.data;
  },
  update: async (
    customerId: string,
    updates: UpdateCustomerInput
  ): Promise<Customer> => {
    const response = await api.put<ApiResponse<Customer>>(
      `/customers/${customerId}`,
      updates
    );
    return response.data.data;
  },
  delete: async (customerId: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(
      `/customers/${customerId}`
    );
    return response.data.data;
  },
};

export { customerService };

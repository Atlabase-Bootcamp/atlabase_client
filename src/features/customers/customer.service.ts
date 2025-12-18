import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { CreateCustomerInput, Customer } from "./customer.types";

const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const { data } = await api.get<ApiResponse<Customer[]>>("/customers");
    return data.data;
  },
  create: async (customerData: CreateCustomerInput): Promise<Customer> => {
    const { data } = await api.post<ApiResponse<Customer>>(
      "/customers",
      customerData
    );
    return data.data;
  },
};

export { customerService };

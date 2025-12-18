import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Customer } from "./customer.types";

const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const { data } = await api.get<ApiResponse<Customer[]>>("/customers");
    return data.data;
  },
};

export { customerService };

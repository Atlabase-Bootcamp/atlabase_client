import api from "@/lib/axios";
import { DashboardResponse } from "./dashboard.types";
import { ApiResponse } from "@/types";

const dashboardService = {
  async getDashboard() {
    const { data } =
      await api.get<ApiResponse<DashboardResponse>>("/dashboard");
    console.log(data.data);
    return data.data;
  },
};

export default dashboardService;

import { useQuery } from "@tanstack/react-query";
import dashboardService from "./dashboard.service";

const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export { useDashboard };

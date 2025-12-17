import { useQuery } from "@tanstack/react-query";
import { projectService } from "./project.service";

const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectService.getAll,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export { useGetProjects };

import { useQuery } from "@tanstack/react-query";
import { projectService } from "../project.service";

const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export { useProject };

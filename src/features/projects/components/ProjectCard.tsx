import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, User } from "lucide-react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { Project } from "../project.type";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold leading-tight">
              {project.title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <User />
              {project.customer.name}
            </div>
          </div>
          <ProjectStatusBadge status={project.status} />
        </CardHeader>
        <CardContent>
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1 h-3 w-3" />
            {project.estimated_end_date
              ? `Vence: ${new Date(project.estimated_end_date).toLocaleDateString()}`
              : "Sin fecha límite"}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export { ProjectCard };

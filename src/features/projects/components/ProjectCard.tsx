import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, User } from "lucide-react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { Project } from "../project.type";
import Link from "next/link";
import { ProjectActions } from "./ProjectActions";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="relative group hover:shadow-md transition-shadow">
      <Link
        href={`/dashboard/projects/${project.id}`}
        className="absolute inset-0 z-0"
      >
        <span className="sr-only">Ver proyecto {project.title}</span>
      </Link>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 gap-2">
        <div className="space-y-1 min-w-0">
          <CardTitle className="text-base font-semibold leading-tight truncate pr-1">
            {project.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <User />
            {project.customer.name}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ProjectStatusBadge status={project.status} />
          <div className="relative z-10">
            <ProjectActions project={project} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1 h-3 w-3 shrink-0" />
          {project.estimated_end_date
            ? `Vence: ${new Date(project.estimated_end_date).toLocaleDateString()}`
            : "Sin fecha límite"}
        </div>
      </CardContent>
    </Card>
  );
}

export { ProjectCard };

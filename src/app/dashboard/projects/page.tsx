"use client";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CreateProjectDialog } from "@/features/projects/components/CreateProjectDialog";

function ProjectPage() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <ProjectsSkeleton />;
  if (error) return <div>Ha ocurrido un error: {error.message}</div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
          <p>Gestiona y monitorea el progreso de tus trabajos.</p>
        </div>
        <CreateProjectDialog />
      </div>

      {projects?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-100 border border-dashed rounded-lg bg-muted/50">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No tienes proyectos aún</h3>
            <p className="text-muted-foreground text-sm">
              Comienza creando tu primer proyecto para un cliente.
            </p>
            <Button variant="outline" className="mt-4">
              Crear Proyecto
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md-grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;

"use client";

import { useProject } from "../hooks/useProject";
import { useProjectTasks } from "../hooks/useProjectTasks";
import { Progress } from "@/components/ui/progress";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { TaskItem } from "./TaskItem";
import { Button } from "@/components/ui";
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TaskFormValues } from "../project.schema";
import { TaskForm } from "./TaskForm";

function ProjectDetailView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { data: project, isLoading, error } = useProject(projectId);
  const { addTask, toggleTask } = useProjectTasks(projectId);

  if (isLoading) return <div>Cargando projecto...</div>;
  if (error) return <div>Occurío un error: {error.message}</div>;
  if (!project) return <div>Proyecto no encontrado. :(</div>;

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter((t) => t.is_completed).length;
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleToggleTask = (taskId: string, currentStatus: boolean) => {
    toggleTask.mutate({ taskId, isCompleted: !currentStatus });
  };

  const handleAddTask = (data: TaskFormValues) => {
    addTask.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="gap-2 pl-0"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>

      <div className="border-b pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>

        <p className="text-muted-foreground text-lg mb-4">
          {project.description || "Sin descripción"}
        </p>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Cliente:</span>
            {project.customer.name}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Vence:{" "}
            {project.estimated_end_date
              ? new Date(project.estimated_end_date).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Progreso del Proyecto</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p>
          {completedTasks} de {totalTasks} tareas completadas
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Tareas
          </h2>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border mb-4">
          <TaskForm onAdd={handleAddTask} isPending={addTask.isPending} />
        </div>

        {project.tasks.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-lg text-muted-foreground">
            <p>No hay tareas registradas en este proyecto</p>
          </div>
        ) : (
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ProjectDetailView };

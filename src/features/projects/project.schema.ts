import { z } from "zod";

export const ProjectStatusEnum = z.enum([
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export const projectSchema = z.object({
  title: z.string().min(3, "El titulo debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  customerId: z.string().min(1, "Debes seleccionar un cliente"),
  date: z.date().optional(),
  status: ProjectStatusEnum.optional(),
});

export const taskSchema = z.object({
  title: z.string().min(3, "La tarea debe tener al menos 3 caracteres."),
  description: z.string().optional(),
});

export const udpateProjectSchema = projectSchema.partial();

export type TaskFormValues = z.infer<typeof taskSchema>;
export type CreateProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof udpateProjectSchema>;
export type ProjectStatusType = z.infer<typeof ProjectStatusEnum>;

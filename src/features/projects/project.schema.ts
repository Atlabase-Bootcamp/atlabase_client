import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "La tarea debe tener al menos 3 caracteres."),
  description: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

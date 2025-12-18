import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(3, "Nombre debe tener al menos 3 caracteres"),
  email: z.email().optional(),
  phone_number: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .optional(),
  notes: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

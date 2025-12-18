import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(3, "EL nombre debe tener al menos 3 caracteres"),
  email: z.email("Email inválido").optional().or(z.literal("")),
  phone_number: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .optional()
    .or(z.literal("")),
  notes: z.string().optional(),
});
const updateCustomerSchema = createCustomerSchema.partial();
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

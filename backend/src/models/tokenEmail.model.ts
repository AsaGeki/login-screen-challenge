import { z } from "zod";

export const tokenEmail = z.object({
  email: z
    .string()
    .email("email inválido")
    .transform((s) => s.toLowerCase()),
});

export type tokenEmail = z.infer<typeof tokenEmail>;

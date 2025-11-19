import { z } from "zod";

export const tokenEmail = z.object({
  email: z
    .string()
    .email("email inválido")
    .transform((s) => s.toLowerCase()),
  username: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/),
});

export type tokenEmail = z.infer<typeof tokenEmail>;

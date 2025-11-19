import { z } from "zod";

export const register = z.object({
  username: z
    .string()
    .min(4, "username deve ter pelo menos 4 caracteres")
    .max(20, "username deve ter no máximo 20 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/, "username contém caracteres inválidos"),
  email: z
    .string()
    .email("email inválido")
    .transform((s) => s.toLowerCase()),
  password: z.string().min(4, "password deve ter pelo menos 4 caracteres"),
});

export type registerModel = z.infer<typeof register>;

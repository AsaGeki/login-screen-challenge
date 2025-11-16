// userRegister.model.ts
import { z } from "zod";

export const userLogin = z.object({
  username: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/, "username contém caracteres inválidos"),
  password: z.string()
});

export type userLogin = z.infer<typeof userLogin>;
// userRegister.model.ts
import { z } from "zod";

export const login = z.object({
  username: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/, "username contém caracteres inválidos"),
  password: z.string()
});

export type loginModel = z.infer<typeof login>;
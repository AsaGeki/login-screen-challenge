import { z } from "zod";

export const tokenPayload = z.object({
  id: z.number(),
  username: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/)
});

export type tokenPayload = z.infer<typeof tokenPayload>;

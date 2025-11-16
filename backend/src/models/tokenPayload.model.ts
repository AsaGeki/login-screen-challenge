import zod from "zod";

export const userSchema = zod.object({
  id: zod.int(),
  gmail: zod.string().email().toLowerCase()
});

export type tokenPayload = zod.infer<typeof userSchema>;

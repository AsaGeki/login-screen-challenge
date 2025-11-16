import zod from "zod";

export const userSchema = zod.object({
  username: zod
    .string()
    .min(4)
    .max(20)
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/),
  gmail: zod.string().email().toLowerCase(),
  password: zod.string().min(4),
  createDate: zod.date(),
});

export type userRegister = zod.infer<typeof userSchema>;

import zod from "zod";

export const userSchema = zod.object({
    username: zod.string().min(4).max(20).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/),
    password: zod.string().min(4)
});

export type userLogin = zod.infer<typeof userSchema>;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenEmail = void 0;
const zod_1 = require("zod");
exports.tokenEmail = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("email inválido")
        .transform((s) => s.toLowerCase()),
    username: zod_1.z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/),
});

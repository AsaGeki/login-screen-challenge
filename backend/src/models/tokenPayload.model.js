"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenPayload = void 0;
const zod_1 = require("zod");
exports.tokenPayload = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+$/)
});

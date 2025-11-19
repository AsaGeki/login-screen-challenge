import dotevn from "dotenv"
dotevn.config()

import { JwtPayload, verify } from "jsonwebtoken"
import { tokenPayload } from "../models/tokenPayload.model"
import { tokenEmail } from "../models/tokenEmail.model"

export const user = (token: string): tokenPayload => {
    const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload
    return tokenPayload.parse(decoded)
}

export const email = (token: string): tokenEmail => {
    const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload
    return tokenEmail.parse(decoded)
}
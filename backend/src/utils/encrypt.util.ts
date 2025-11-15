import bcrypt from "bcrypt";

export async function encrypt(password:string): Promise<string> {
    const salt = await bcrypt.genSalt(13)
    return bcrypt.hash(password, salt)
};

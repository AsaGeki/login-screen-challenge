import bcrypt from "bcrypt";

export const encrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(13);
  return bcrypt.hash(password, salt);
}

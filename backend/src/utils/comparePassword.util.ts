import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  encrypt: string
): Promise<boolean> => {
  return bcrypt.compare(password, encrypt);
};

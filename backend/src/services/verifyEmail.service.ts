import * as tokenUtil from "../utils/token.util";

export async function verifyEmail(token: string) {
  try {
    const decoded = await tokenUtil.verify(token);
    return { success: true, decoded };
  } catch (err) {
    return { success: false, error: err };
  }
}

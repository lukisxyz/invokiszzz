import bcrypt from "bcryptjs";

export async function hashPassword(pwd: string): Promise<{
  status: boolean;
  value: string;
  error: Error | null;
}> {
  try {
    const salt = await bcrypt.genSalt(16);
    const hashed = await bcrypt.hash(pwd, salt);
    return {
      status: true,
      value: hashed,
      error: null,
    };
  } catch (error) {
    const e = error as Error;
    return {
      status: false,
      value: "",
      error: e,
    };
  }
}

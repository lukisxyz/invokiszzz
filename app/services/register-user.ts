import * as Z from "zod";
import { hashPassword } from "~/lib/hash";
import prisma from "~/lib/prisma";
import { generateRandomString } from "~/lib/rand";

export const userRegistrationSchema = Z.object({
  email: Z.string({
    required_error: "Email is required",
  }).email("Invalid email address"),
  name: Z.string(),
  password: Z.string().min(8, "Password must be at least 8 characters long"),
  repeat_password: Z.string().min(
    8,
    "Repeat password must be at least 8 characters long"
  ),
});

export type UserRegistrationInput = Z.TypeOf<typeof userRegistrationSchema>;

export default async function UserRegistration({
  email,
  name,
  password,
  repeat_password,
}: UserRegistrationInput) {
  const { status, value, error } = await hashPassword(password);
  if (!status) throw new Error(error?.message);
  const randomString = generateRandomString(6);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: value,
        code_verification: randomString,
      },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcrypt";
import { db } from "./prismaClient";
import { User } from "next-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserFromDB = async (email: string, password: string) => {
  try {
    const { hashedPassword } = await db.user.findFirst({
      where: { email: email },
    });

    if (typeof hashedPassword !== "string") {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new Error("Incorrect password");
    }

    return {
      credentials: { email: email, password: password },
    } as User;
  } catch (err) {
    return null;
  }
};

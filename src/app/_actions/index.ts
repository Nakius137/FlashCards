"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { FormState } from "../(nav)/signin/page";
import { db } from "@/lib/prismaClient";
import bcryptjs from "bcryptjs";

export const onSignInAction = async (prevState: FormState, data: FormData) => {
  try {
    await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
  } catch (err) {
    return { message: "Check your credentials" };
  }
  redirect("/dashboard");
};

export const onSignUpAction = async (prevState: FormState, data: FormData) => {
  const username = data.get("username") as string;
  const email = data.get("email") as string;
  const usersPassword = data.get("password") as string;
  const salt = 12;
  const hashedPassword = await bcryptjs.hash(usersPassword, salt);

  try {
    const isTaken = await db.user.findFirst({
      where: {
        OR: [
          {
            Email: email,
          },
          {
            Name: username,
          },
        ],
      },
    });

    if (!isTaken) {
      await db.user.create({
        data: {
          Email: email,
          Passowrd: hashedPassword,
          Name: username,
        },
      });
    } else {
      return { message: "User already exists" };
    }
  } catch (err) {
    return { message: JSON.stringify(err) };
  }
  redirect("/dashboard");
};

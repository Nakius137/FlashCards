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
  redirect("/main");
};

export const onSignUpAction = async (prevState: FormState, data: FormData) => {
  const salt = 12;
  const usersPassword = data.get("password") as string;
  const hashedPassword = await bcryptjs.hash(usersPassword, salt);

  try {
    db.user.create({
      data: {
        Email: data.get("email") as string,
        Passowrd: hashedPassword,
        Name: data.get("username") as string,
      },
    });
  } catch (err) {
    return { message: JSON.stringify(err) };
  }
  redirect("/main");
};

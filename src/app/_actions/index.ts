"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { FormState } from "../(nav)/signin/page";

export const onSubmitAction = async (prevState: FormState, data: FormData) => {
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

export const registerUserInDB = async () => {};

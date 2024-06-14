"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const onSubmitAction = async (
  prevState: { message: string },
  data: FormData
) => {
  try {
    const response = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
  } catch (err) {
    console.log(err);
    return {
      message: "Check your credentials",
    };
  }
  redirect("/main");
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onSignUpAction } from "@/app/_actions/index";
import { useFormState } from "react-dom";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

export type SignUp = z.infer<typeof signUpSchema>;

export default function SignUp() {
  //@ts-ignore
  const [state, formAction] = useFormState<FormState>(onSignUpAction, {
    message: "",
  });

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-950">
      <Card className="w-[350px] flex justify-center bg-zinc-950 text-white py-5">
        <Form {...form}>
          <form
            ref={formRef}
            action={formAction}
            onSubmit={form.handleSubmit(() => {
              //@ts-ignore
              formAction(new FormData(formRef.current as HTMLFormElement));
            })}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="jason@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Jason1338"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state && <div className="text-red-500">{state.message}</div>}
            <Button className="flex justify-center" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

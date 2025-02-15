"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
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
import { onSignInAction } from "@/app/_actions/index";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export type SignIn = z.infer<typeof signInSchema>;
export type FormState = {
  message: string;
};

export default function SignIn() {
  //@ts-ignore
  const [state, formAction] = useFormState<FormState>(onSignInAction, {
    message: "",
  });
  const { pending } = useFormStatus();

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="text-black"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state.message && (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <Button
              className="flex justify-center"
              type="submit"
              disabled={pending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

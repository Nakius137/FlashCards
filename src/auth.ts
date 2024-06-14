import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { db } from "./lib/prismaClient";
//@ts-ignore
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@o2.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }
        try {
          const user = await db.user.findFirst({
            where: { Email: credentials.email },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await bcryptjs.compare(
            credentials.password,
            user.Passowrd
          );

          if (!isValidPassword) {
            return null;
          }

          return user as any;
        } catch (err) {
          if (err instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});

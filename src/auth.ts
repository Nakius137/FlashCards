import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { db } from "./lib/prismaClient";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
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
  callbacks: {
    authorized: async ({ request, auth }) => {
      const { username, password } = request.nextUrl;

      if (!username || !password) {
        return NextResponse.redirect("localhost:3000");
      }
      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});


import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { authConfig } from "./auth.config";
import type { Role } from "@prisma/client";

const isValidRole = (value: unknown): value is Role =>
  typeof value === "string" &&
  (value === "STUDENT" || value === "ADMIN");

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";

        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            fullName: true,
            email: true,
            password: true,
            role: true,
            isPremium: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
        };
      },
    }),
  ],

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user }) {
      if (user) {
        const role = (user as { role?: unknown }).role;
        const isPremium = (user as { isPremium?: unknown })
          .isPremium;

        if (isValidRole(role)) {
          token.role = role;
        }

        if (typeof isPremium === "boolean") {
          token.isPremium = isPremium;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const role: unknown = token.role;
        const isPremium: unknown = token.isPremium;

        if (isValidRole(role)) {
          session.user.role = role;
        }

        if (typeof isPremium === "boolean") {
          session.user.isPremium = isPremium;
        }
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});

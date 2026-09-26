import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { authConfig } from "./auth.config";

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
        /*
         * ------------------------------------------------------
         * 1. VALIDATE CREDENTIALS
         * ------------------------------------------------------
         *
         * IMPORTANT:
         * Never log credentials, passwords, password hashes,
         * or complete user records in production logs.
         */

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

        /*
         * ------------------------------------------------------
         * 2. FIND USER
         * ------------------------------------------------------
         *
         * Only fetch the fields required by authentication.
         * Do not load the complete Prisma user record.
         */

        const user = await prisma.user.findUnique({
          where: {
            email,
          },

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

        /*
         * ------------------------------------------------------
         * 3. VERIFY PASSWORD
         * ------------------------------------------------------
         */

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        /*
         * ------------------------------------------------------
         * 4. RETURN SAFE SESSION USER
         * ------------------------------------------------------
         *
         * Never return the password or password hash.
         */

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

    /*
     * --------------------------------------------------------
     * JWT
     * --------------------------------------------------------
     */

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.isPremium = (user as any).isPremium;
      }

      return token;
    },

    /*
     * --------------------------------------------------------
     * SESSION
     * --------------------------------------------------------
     */

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).isPremium =
          token.isPremium;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
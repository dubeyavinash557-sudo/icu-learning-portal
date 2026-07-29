import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        console.log("========== AUTHORIZE CALLED ==========");

        console.log("Credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing Email or Password");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        console.log("User Found:", user);

        if (!user) {
          console.log("❌ User Not Found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        console.log("Password Match:", passwordMatch);

        if (!passwordMatch) {
          console.log("❌ Invalid Password");
          return null;
        }

        console.log("✅ Login Successful");

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

  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isDashboard && !isLoggedIn) {
        return false;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.isPremium = (user as any).isPremium;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).isPremium = token.isPremium;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
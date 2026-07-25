import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

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

        if (
          credentials?.email === "admin@icuportal.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Avinash Dubey",
            email: "admin@icuportal.com",
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

});

export { handler as GET, handler as POST };
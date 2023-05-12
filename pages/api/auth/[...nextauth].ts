import { PrismaAdapter } from "@next-auth/prisma-adapter"; // prisma adapter for next-auth
import NextAuth, { AuthOptions } from "next-auth"; // next-auth and auth options config
import GithubProvider from "next-auth/providers/github"; // github provider for next-auth
import GoogleProvider from "next-auth/providers/google"; // google provider for next-auth
import CredentialsProvider from "next-auth/providers/credentials"; // credentials provider for next-auth
import bcrypt from "bcrypt"; // for password hashing

import prisma from "@/app/lib/prismadb";

// configure auth options and export
export const authOptions: AuthOptions = {
  // use prisma
  adapter: PrismaAdapter(prisma),

  // login providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // function for validating credentials
      async authorize(credentials) {
        // if missing credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // find user in db by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // if user not found
        if (!user || !user?.hashedPassword) {
          throw new Error("User not found");
        }

        // compare passwords
        const isCorrectPassword = await bcrypt.compare(
          // password from credentials
          credentials.password,
          // hashed password from db
          user.hashedPassword
        );

        // if incorrect password
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        // if all checks pass, return user
        return user;
      },
    }),
  ],
  pages: {
    // redirect to index page after sign in
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    // use jwt for session
    strategy: "jwt",
  },
  // use env secret for encryption
  secret: process.env.NEXTAUTH_SECRET,
};

// export next-auth with configured options
export default NextAuth(authOptions);

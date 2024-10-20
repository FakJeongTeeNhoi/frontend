import { login, verify } from "@/api/auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.token) {
          const response = await verify(credentials.token);
          if (response?.success) {
            return {
              token: credentials.token,
              ...response,
            };
          }
        } else if (credentials?.email && credentials?.password) {
          const response = await login(credentials.email, credentials.password);
          if (response?.success) {
            return {
              token: response.token,
              ...response.userInfo,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          account_id: user.account_id,
          account_type: user.account_type,
          email: user.email,
          faculty: user.faculty,
          name: user.name,
          type: user.type,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        account_id: token.account_id as number,
        account_type: token.account_type as string,
        email: token.email as string,
        faculty: token.faculty as string,
        name: token.name as string,
        type: token.type as string,
      };
      session.token = token.token as string;
      return session;
    },
  },
  pages: {
    signIn: "/staff/signIn",
  },
};
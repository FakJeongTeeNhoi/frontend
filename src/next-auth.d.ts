import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      account_id: number;
      account_type: string;
      email: string;
      faculty: string;
      name: string;
      type: string;
    };
    token: string;
  }

  interface User {
    account_id: number;
    account_type: string;
    email: string;
    faculty: string;
    name: string;
    type: string;
    token: string;
  }

  interface JWT {
    account_id: number;
    account_type: string;
    email: string;
    faculty: string;
    name: string;
    type: string;
    token: string;
  }
}

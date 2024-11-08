import axios from "axios";
import { getSession } from "next-auth/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_USER;

export interface User {
  userId: number;
  name: string;
  email: string;
  faculty: string;
  type: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get(`${backendUrl}/api/user`);

    return response.data.users.map((user: any) => ({
      userId: Number(user.user_id),
      name: user.account.name,
      email: user.account.email,
      faculty: user.account.faculty,
      type: user.account.type,
    }));
  } catch (error) {
    console.error("Get All Users error:", error);
    throw error;
  }
}

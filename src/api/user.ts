import axios from "axios";
import { getSession } from "next-auth/react";
import { GetSpaceData } from "./space";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_USER;

export interface User {
  userId: number;
  name: string;
  email: string;
  faculty: string;
  type: string;
}
export interface StaffAccount {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  email: string;
  password: string;
  name: string;
  faculty: string;
  type: string;
  is_verify: boolean;
}
export interface Staff {
  account: StaffAccount;
  account_id: number;
  space_list: GetSpaceData[];
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get(`${backendUrl}/user/user`);

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

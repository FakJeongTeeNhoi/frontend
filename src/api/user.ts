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

export interface UpdateUser {
  account_id: number;
  user_id?: string;
  name: string;
  faculty: string;
  type: string;
  role?: string;
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

export async function updateUser(
  user: UpdateUser
): Promise<{ success: boolean }> {
  try {
    const response = await axios.put(`${backendUrl}/api/user`, {
      id: user.account_id,
      user_id: user.user_id,
      name: user.name,
      faculty: user.faculty,
      type: user.type,
      role: user.role,
    });
    return { success: true };
  } catch (error) {
    console.error("Update user error: ", error);
    return { success: false };
  }
}

export async function updateStaff(
  user: UpdateUser
): Promise<{ success: boolean }> {
  try {
    const response = await axios.put(`${backendUrl}/api/staff`, {
      id: user.account_id,
      name: user.name,
      faculty: user.faculty,
      type: user.type,
    });
    return { success: true };
  } catch (error) {
    console.error("Update user error: ", error);
    return { success: false };
  }
}

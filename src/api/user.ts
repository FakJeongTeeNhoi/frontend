import axios from "axios";
import { getSession } from "next-auth/react";
import { GetSpaceData } from "./space";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export async function getUserFromUserId(userId: Number): Promise<User> {
  try {
    // TODO: change url to get user by user id endpoint
    const response = await axios.post(`${backendUrl}/user/user/`, {
      user_list: [String(userId)],
    });

    const user = <User>{
      userId: Number(response.data.user.user_id),
      name: response.data.user.account.name,
      email: response.data.user.account.email,
      faculty: response.data.user.account.faculty,
      type: response.data.user.account.type,
    };

    return user;
  } catch (error) {
    console.error("Get User by ID error:", error);
    throw error;
  }
}

export async function updateUser(
  user: UpdateUser
): Promise<{ success: boolean }> {
  try {
    const response = await axios.put(`${backendUrl}/user/user`, {
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
    const response = await axios.put(`${backendUrl}/user/staff`, {
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

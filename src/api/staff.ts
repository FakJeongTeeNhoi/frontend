import axios from "axios";
import { getSession } from "next-auth/react";
import { StaffAccount } from "./user";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Staff {
  id: number;
  name: string;
  email: string;
  faculty: string;
  type: string;
  spaceList: number[];
}

export async function getStaffs(): Promise<Staff[]> {
  try {
    const response = await axios.get(`${backendUrl}/user/staff`);

    return response.data.staffs.map((staff: any) => ({
      id: staff.account.ID,
      spaceList: staff.space_list,
      name: staff.account.name,
      email: staff.account.email,
      faculty: staff.account.faculty,
      type: staff.account.type,
    }));
  } catch (error) {
    console.error("Get All Staffs error:", error);
    throw error;
  }
}

export async function getStaffAccounts(): Promise<StaffAccount[]> {
  try {
    const response = await axios.get(`${backendUrl}/user/staff`);

    return response.data.staffs.map((staff: any) => ({
      ID: staff.account.ID,
      CreatedAt: staff.account.CreatedAt,
      UpdatedAt: staff.account.UpdatedAt,
      DeletedAt: staff.account.DeletedAt,
      email: staff.account.email,
      password: staff.account.password,
      name: staff.account.name,
      faculty: staff.account.faculty,
      type: staff.account.type,
      is_verify: staff.account.is_verify,
    }));
  } catch (error) {
    console.error("Get All Staffs error:", error);
    throw error;
  }
}

export async function getStaffList(list: number[]): Promise<StaffAccount[]> {
  try {
    // console.log("list", list);
    const response = await axios.get(`${backendUrl}/user/staff`);
    // console.log("response", response.data.staffs);

    return response.data.staffs
      .filter((staff: any) => list.includes(staff.account.ID))
      .map((staff: any) => ({
        ID: staff.account.ID,
        CreatedAt: staff.account.CreatedAt,
        UpdatedAt: staff.account.UpdatedAt,
        DeletedAt: staff.account.DeletedAt,
        email: staff.account.email,
        password: staff.account.password,
        name: staff.account.name,
        faculty: staff.account.faculty,
        type: staff.account.type,
        is_verify: staff.account.is_verify,
      }));
  } catch (error) {
    console.error("Get All Staffs error:", error);
    throw error;
  }
}
import axios from "axios";
import { getSession } from "next-auth/react";

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

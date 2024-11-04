import { Pair } from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND;

export type SearchParams = {
  name: string | null;
  faculty: string | null;
  start_datetime: Date | null;
  end_datetime: Date | null;
  capacity: number | null;
  latitude_range: Pair<number, number> | null;
  longitude_range: Pair<number, number> | null;
};

export type GetRoomData = {
  ID: number;
  name: string;
  description: string;
  room_number: string;
  capacity: number;
  min_reserve_capacity: number;
  is_available: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export type GetSpaceData = {
  ID: number;
  name: string;
  description: string;
  faculty: string;
  floor: number;
  building: string;
  latitude: number;
  longitude: number;
  head_staff: string;
  is_available: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  faculty_access_list: string[];
  opening_day: string[];
  staff_list: number[];
  type: string;
  working_hour: string[];
  room_list: GetRoomData[];
}

export async function getAllSpace() {
  try {
    console.log(`${backendUrl}/api/space/search`);
    const response = await axios.get(`${"http://localhost:8080"}/space/space/search`);
    return response.data.space;
  } catch (error) {
    console.error("Get spaces error:", error);
    throw error;
  }
}
export async function getSpace(searchParams: SearchParams) {
  try {
    const response = await axios.get(`${"http://localhost:8080"}/space/space/search`, {
      params: searchParams,
    });

    return response.data.space;
  } catch (error) {
    console.error("Get spaces error:", error);
    throw error;
  }
}
export async function getSpaceById(spaceId: string) {
  try {
    const response = await axios.get(`${"http://localhost:8080"}/space/space/${spaceId}`);
    return response.data.space;
  } catch (error) {
    console.error("Get space error:", error);
    throw error;
  }
}

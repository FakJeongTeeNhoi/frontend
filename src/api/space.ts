import { Pair } from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export type CreateSpaceData = {
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
  room_list: number[];
}

export async function getAllSpace() {
  try {
    const response = await axios.get(`${backendUrl}/space/space/search`);
    return response.data.space;
  } catch (error) {
    console.error("Get spaces error:", error);
    throw error;
  }
}
export async function getSpace(searchParams: SearchParams) {
  try {
    const response = await axios.get(`${backendUrl}/space/space/search`, {

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
    const response = await axios.get(`${backendUrl}/space/space/${spaceId}`);
    return response.data.space;
  } catch (error) {
    console.error("Get space error:", error);
    throw error;
  }
}

export async function createSpace(space: GetSpaceData) {
  try {

    // convert GetSpaceData to CreateSpaceData
    const createSpaceData: CreateSpaceData = {
      ID: space.ID,
      name: space.name,
      description: space.description,
      faculty: space.faculty,
      floor: space.floor,
      building: space.building,
      latitude: space.latitude,
      longitude: space.longitude,
      head_staff: space.head_staff,
      is_available: space.is_available,
      CreatedAt: space.CreatedAt,
      UpdatedAt: space.UpdatedAt,
      DeletedAt: space.DeletedAt,
      faculty_access_list: space.faculty_access_list,
      opening_day: space.opening_day,
      staff_list: space.staff_list,
      type: space.type,
      working_hour: space.working_hour,
      room_list: [],
    };

    // loop through the room_list and create each room
    for (let room of space.room_list) {
      room = await createRoom(room);
      createSpaceData.room_list.push(room.ID);
    }

    const response = await axios.post(`${backendUrl}/space/space`, createSpaceData);

    return response.data.space;
  } catch (error) {
    console.error("Create space error:", error);
    throw error;
  }
}

export async function createRoom(room: GetRoomData) {
  try {
    const response = await axios.post(`${backendUrl}/space/room`, room);
    return response.data.room;
  } catch (error) {
    console.error("Create room error:", error);
    throw error;
  }
}
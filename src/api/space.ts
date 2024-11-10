import { Pair } from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import axios from "axios";
import { Dayjs } from "dayjs";
import { Staff } from "./staff";

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

export type RoomCreationInfo = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  minRequire: number;
  roomNumber: string;
};

export type SpaceCreationInfo = {
  name: string;
  type: string;
  description: string;
  faculty: string;
  building: string;
  floor: string;
  latitude: number;
  longitude: number;
  startTime: Dayjs;
  endTime: Dayjs;
  openingDays: string[];
  accessList: string[];
  staffs: Staff[];
  rooms: RoomCreationInfo[];
};


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

function getWorkingHour(startTime: Dayjs, endTime: Dayjs, openingDays: string[]) {
  const workingHour = [];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (let day of days) {
    if (openingDays.includes(day)) {
      workingHour.push(`${startTime.format("HH:mm")} - ${endTime.format("HH:mm")}`);
    }else{
      workingHour.push(`Closed`);
    }
  }
  return workingHour;
}

export async function createSpace(space: SpaceCreationInfo) {
  try {

    const createSpaceData = {
      name: space.name,
      type: space.type,
      description: space.description,
      faculty: space.faculty,
      building: space.building,
      floor: space.floor,
      latitude: space.latitude,
      longitude: space.longitude,
      working_hour: getWorkingHour(space.startTime, space.endTime, space.openingDays),
      faculty_access_list: space.accessList,
      staff_list: space.staffs.map((staff) => staff.id),
      room_list: <Number[]>[],
    };

    // loop through the rooms and create a room list
    for (let room of space.rooms) {
      room = await createRoom(room);
      createSpaceData.room_list.push(room.id);
    }

    const response = await axios.post(`${backendUrl}/space/space`, createSpaceData);
    return response.data.space;
  } catch (error) {
    console.error("Create space error:", error);
    throw error;
  }
}

export async function createRoom(room: RoomCreationInfo) {
  try {
    const response = await axios.post(`${backendUrl}/space/room`, {
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      min_reserve_capacity: room.minRequire,
      room_number: room.roomNumber,
    });
    return response.data.room;
  } catch (error) {
    console.error("Create room error:", error);
    throw error;
  }
}
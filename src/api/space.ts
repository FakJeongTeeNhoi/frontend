import { Pair } from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import axios from "axios";
import { Dayjs } from "dayjs";
import { Staff } from "./staff";
import { RoomCreationInfo, createRoom } from "./room";

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
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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

    console.log("input for createSpace", space);

    const createSpaceData = {
      name: space.name,
      type: space.type,
      description: space.description,
      faculty: space.faculty,
      building: space.building,
      floor: Number(space.floor),
      latitude: Number(space.latitude),
      longitude: Number(space.longitude),
      working_hour: getWorkingHour(space.startTime, space.endTime, space.openingDays),
      faculty_access_list: space.accessList,
      staff_list: space.staffs.map((staff) => staff.id),
      head_staff: String(space.staffs[0].id),
      room_list: <String[]>[],
    };

    console.log("createSpaceData", createSpaceData);

    // loop through the rooms and create a room list
    for (let room of space.rooms) {
      const roomResponse = await createRoom(room);
      console.log("room", roomResponse);
      createSpaceData.room_list.push(String(roomResponse.ID));
    }

    console.log("createSpaceDataAfterRoom", createSpaceData);

    const response = await axios.post(`${backendUrl}/space/space/`, createSpaceData);
    return response.data.space;
  } catch (error) {
    console.error("Create space error:", error);
    throw error;
  }
}

export async function deleteSpace(spaceId: string) {
  try {
    const response = await axios.delete(`${backendUrl}/space/space/${spaceId}`);
    return response.data;
  } catch (error) {
    console.error("Delete space error:", error);
    throw error;
  }
}

export async function removeStaffFromSpace(spaceId: string, staffId: number) {
  try {
    const response = await axios.post(`${backendUrl}/space/space/${spaceId}/removeStaff`, {
      staff_id: [staffId],
    });

    return response.data;
  } catch (error) {
    console.error("Remove staff from space error:", error);
    throw error;
  }
}

export async function addStaffToSpace(spaceId: string, staffId: number) {
  try {
    const response = await axios.post(`${backendUrl}/space/space/${spaceId}/addStaff`, {
      staff_id: [staffId],
    });

    return response.data;
  } catch (error) {
    console.error("Add staff to space error:", error);
    throw error;
  }
}

export async function addRoomToSpace(spaceId: number, roomId: number) {
  try {
    const response = await axios.post(`${backendUrl}/space/space/${spaceId}/addRoom`, {
      room_list: [roomId],
    });
    return response.data.success;
  } catch (error) {
    console.error("Add room to space error:", error);
    throw error;
  }
}

export async function removeRoomFromSpace(spaceId: number, roomId: number) {
  try {
    console.log("Removing room from space", spaceId, roomId);
    const response = await axios.post(`${backendUrl}/space/space/${spaceId}/removeRoom`, {
      room_list: [roomId],
    });
    return response.data.success;
  } catch (error) {
    console.error("Remove room from space error:", error);
    throw error;
  }
}
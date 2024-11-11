import axios from "axios";
import { GetRoomData, removeRoomFromSpace } from "./space";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export type RoomCreationInfo = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  minRequire: number;
  roomNumber: string;
};

export async function createRoom(room: RoomCreationInfo) {
  try {
    const response = await axios.post(`${backendUrl}/space/room/`, {
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

export async function getRoomById(id: number) {
  try {
    const response = await axios.get(`${backendUrl}/space/room/${id}`);
    return response.data.room;
  } catch (error) {
    console.error("Get room by ID error:", error);
    throw error;
  }
}

export async function deleteRoom(spaceId:number, id: number) {
  try {
    const response2 = await removeRoomFromSpace(spaceId, id);
    console.log(response2);
    if (response2) {
      const response = await axios.delete(`${backendUrl}/space/room/${id}`);
      return response.data;
      return response2
    }
  } catch (error) {
    console.error("Delete room error:", error);
    throw error;
  }
}

export async function updateRoom(room: GetRoomData) {
  try {
    const response = await axios.put(`${backendUrl}/space/room/${room.ID}`, room);
    return response.data.room;
  } catch (error) {
    console.error("Update room error:", error);
    throw error;
  }
}
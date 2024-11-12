import axios from "axios";
import { GetRoomData, getSpaceById } from "./space";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Reservation = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  participants: number[];
  pending_participants: number[];
  status: string;
  approver: number;
  start_date_time: string;
  end_date_time: string;
  room_id: number;
};

export type Reservation_response = {
  count: number;
  reservations: Reservation[];
  success: boolean;
};

export interface Request {
  id: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  participants: Number[];
  pending_participants: Number[];
  status: string;
  approver: Number;
  start_date_time: string;
  end_date_time: string;
  room_id: number;
}

export async function getMyReservation(
  token: string
): Promise<Reservation_response> {
  try {
    const response = await axios.get(
      `${backendUrl}/reserve/reserve?userId=6432133721`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Get my reservation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get my reservation error:", error);
    throw error;
  }
}

export async function cancelReservation(reservationId: string, token: string) {
  try {
    console.log("Cancel reservation with ID:", reservationId);
    const response = await axios.put(
      `${backendUrl}/reserve/reserve/cancel/${reservationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Cancel reservation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Cancel reservation error:", error);
    throw error;
  }
}

export async function getReservationDetailByListOfRoomId(roomIdList: GetRoomData[]) {
  try {
    var requestList: Request[] = [];
    for (let i = 0; i < roomIdList.length; i++) {
      const response = await axios.get(
        `${backendUrl}/reserve/reserve/?roomId=${roomIdList[i].ID}`
      );
      console.log(
        "Get reservation detail by list of room id response:", roomIdList[i].ID,
        response.data
      );
      requestList = requestList.concat(response.data.reservations.map((reservation: any) => ({
        id: reservation.ID,
        CreatedAt: reservation.CreatedAt,
        UpdatedAt: reservation.UpdatedAt,
        DeletedAt: reservation.DeletedAt,
        participants: reservation.participants,
        pending_participants: reservation.pending_participants,
        status: reservation.status,
        approver: reservation.approver,
        start_date_time: reservation.start_date_time,
        end_date_time: reservation.end_date_time,
        room_id: reservation.room_id,
      })));
    }
    return requestList;
  } catch (error) {
    console.error("Get reservation detail by list of room id error:", error);
    throw error;
  }
}

export async function getReservationDetailBySpaceId(spaceId: string) {
  try {
    const response = await getSpaceById(spaceId);
    console.log(
      "Get reservation detail by space id response:", response.data
    );
    // use response.data.room_list to get room id
    if(response.data.room_list.length == 0) {
      return [];
    }
    return await getReservationDetailByListOfRoomId(response.data.room_list);
  } catch (error) {
    console.error("Get reservation detail by space id error:", error);
    throw error;
  }
}
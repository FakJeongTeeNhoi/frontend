import axios from "axios";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_RESERVE;
import { GetSpaceData } from "./space";

export type Reserve = {
  pending_participants: number[];
  start_date_time: string;
  end_date_time: string;
  room_id: number;
};

export type Reservation = {
  Participants: number[];
  PendingParticipants: number[];
  Status: string;
  Approver: number;
  StartDateTime: string;
  EndDateTime: string;
  RoomId: number;
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
};

export async function createReserve(userId: number, reserve: Reserve) {
  try {
    const response = await axios.post(
      `${backendUrl}/api/reserve`,
      { reserve },
      {
        headers: {
          user_id: userId,
          //   "Content-Type": "application/json",
        },
        // params: { user_id: userId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create reservation error:", error);
    throw error;
  }
}

export async function getReservation(reservationId: number, userId: number) {
  try {
    const response = await axios.get(
      `${backendUrl}/api/reserve/${reservationId}`,
      {
        headers: {
          //   "Content-Type": "application/json",
          user_id: userId,
        },
        // params: { user_id: userId },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Error fetching reservation data. Please try again.");
  }
}

// export const getSpaceByRoomId = async (
//   roomId: number
// ): Promise<GetSpaceData | null> => {
//   try {
//     const response = await fetch(`/api/spaces/${roomId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch space data");
//     }
//     const spaceData: GetSpaceData = await response.json();
//     return spaceData;
//   } catch (error) {
//     console.error("Error fetching space data:", error);
//     return null;
//   }
// };

// export const getRoomByRoomId = async (
//   roomId: number
// ): Promise<GetSpaceData | null> => {
//   try {
//     const response = await fetch(`/api/space/${roomId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch space data");
//     }
//     const spaceData: GetSpaceData = await response.json();
//     return spaceData;
//   } catch (error) {
//     console.error("Error fetching space data:", error);
//     return null;
//   }
// };

export async function confirmParticipant(
  reservationId: number,
  userId: number
) {
  try {
    const response = await axios.put(`${backendUrl}/api/reserve/confirm`, {
      reservation_id: reservationId,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Get reservation error:", error);
    throw error;
  }
}

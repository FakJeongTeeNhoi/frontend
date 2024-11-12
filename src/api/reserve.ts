import axios from "axios";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Reserve = {
  pending_participants: number[];
  start_date_time: string;
  end_date_time: string;
  room_id: number;
};

export type Reservation = {
  ID: string;
  CreatedAt: string;
  DeletedAt: string | null;
  UpdatedAt: string;
  participants: number[];
  pending_participants: number[];
  status: string;
  approver: number;
  start_date_time: string;
  end_date_time: string;
  room_id: number;
};


export async function createReserve(userId: number, reserve: Reserve) {
  try {
    const response = await axios.post(
      `${backendUrl}/reserve/reserve`,
      {
        pending_participants: reserve.pending_participants,
        start_date_time: reserve.start_date_time,
        end_date_time: reserve.end_date_time,
        room_id: reserve.room_id,
      },
      {
        headers: {
          user_id: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

interface ReservationResponse {
  reservation: Reservation;
  success: boolean;
}

export async function getReservation(
  reservationId: number,
  userId: number
): Promise<Reservation | null> {
  try {
    const response = await axios.get(
      `${backendUrl}/reserve/reserve/${reservationId}`,
      {
        headers: {
          user_id: userId,
        },
      }
    );
    const { reservation } = response.data;
    return reservation;
  } catch (error: any) {
    throw error;
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
    const response = await axios.put(`${backendUrl}/reserve/reserve/confirm`, {
      reservation_id: reservationId,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function approveReservation(reservationId: Number, token: string) {
    try {
      console.log("Approve reservation with ID:", reservationId, " token:", token);
      const response = await axios.put(`${backendUrl}/reserve/reserve/approve/${reservationId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to approve reservation");
      }
    } catch (error) {
      console.error("Approve reservation error:", error);
      throw error;
    }
}
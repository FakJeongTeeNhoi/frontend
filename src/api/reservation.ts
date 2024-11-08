import axios from "axios";
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
  }

export type Reservation_response = {
	count: number;
	reservations: Reservation[];
	success: boolean;
}

export async function getMyReservation (token: string) :Promise<Reservation_response> {
  try {
	const response = await axios.get(`${backendUrl}/reserve/reserve?userId=6432133721`, {
	  headers: {
		Authorization: `Bearer ${token}`,
	  },
	});
	console.log("Get my reservation response:", response.data);
	return response.data;
  }
  catch (error) {
	console.error("Get my reservation error:", error);
	throw error;
  }
}

export async function cancelReservation(reservationId: string, token: string) {
  try {
	const response = await axios.put(`${backendUrl}/reserve/reserve/${reservationId}`, {
	  headers: {
		Authorization: `Bearer ${token}`,
	  },
	});
	console.log("Cancel reservation response:", response.data);
	return response.data;
  }
  catch (error) {
	console.error("Cancel reservation error:", error);
	throw error;
  }
}
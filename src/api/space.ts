import { Pair } from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SPACE;

export type SearchParams = {
  name: string | null;
  faculty: string | null;
  start_datetime: Date | null;
  end_datetime: Date | null;
  capacity: number | null;
  latitude_range: Pair<number, number> | null;
  longitude_range: Pair<number, number> | null;
};

export async function getAllSpace() {
  try {
    const response = await axios.get(`${backendUrl}/api/space`);
    return response.data;
  } catch (error) {
    console.error("Get spaces error:", error);
    throw error;
  }
}
export async function getSpace(searchParams: SearchParams) {
  try {
    const response = await axios.get(`${backendUrl}/api/space`, {
      params: searchParams,
    });

    return response.data;
  } catch (error) {
    console.error("Get spaces error:", error);
    throw error;
  }
}
export async function getSpaceById(spaceId: string) {
  try {
    const response = await axios.get(`${backendUrl}/api/space/${spaceId}`);
    return response.data;
  } catch (error) {
    console.error("Get space error:", error);
    throw error;
  }
}

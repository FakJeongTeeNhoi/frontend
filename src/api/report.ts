import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Participant = {
  role: string;
  faculty: string;
};

export type ReportResponseBody = {
  id: string;
  reservation_id: string;
  room_id: string;
  room_name: string;
  space_id: string;
  space_name: string;
  status: string;
  start_datetime: Date;
  end_datetime: Date;
  participant: Participant[];
};

export async function getReport(spaceId: string) {
  try {
    const response = await axios.get(`${backendUrl}/report/report/${spaceId}`);
    return response.data.reports;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function downloadReport(spaceId: string) {
  try {
    const response = await axios.get(
      `${backendUrl}/report/report/download/${spaceId}`
    );
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `report_${spaceId}.csv`;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}

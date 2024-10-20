import { ContentType } from "./ContentType";
import { serviceConfig } from "./serviceConfig";

type Participant = {
  role: string;
  faculty: string;
};

type ReportResponseBody = {
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

export const ReportService = {
  getReport: async (spaceId: string): Promise<ReportResponseBody[]> => {
    const url = `${serviceConfig.reportServiceUrl}/${spaceId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": ContentType.JSON,
      },
    });

    if (res.ok) {
      const data =  await res.json();
      return data.reports;
    } else {
      throw new Error(res.statusText);
    }
  },

  downloadReport: async (spaceId: string) => {
    const url = `${serviceConfig.reportServiceUrl}/download/${spaceId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": ContentType.JSON,
      },
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${spaceId}.csv`;
      a.click();
    } else {
      throw new Error(res.statusText);
    }
  }
};

import { ContentType } from "./ContentType";
import { serviceConfig } from "./serviceConfig";

type Participant = {
  type: string;
  faculty: string;
};

type ReportResponseBody = {
  id: string;
  reservation_id: string;
  room_id: string;
  space_id: string;
  space_name: string;
  status: string;
  start_datetime: Date;
  end_datetime: Date;
  participant: Participant[];
};

export const ReportService = {
  getReport: async (spaceId: string): Promise<ReportResponseBody> => {
    const url = `${serviceConfig.reportServiceUrl}/${spaceId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": ContentType.JSON,
      },
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  },
};

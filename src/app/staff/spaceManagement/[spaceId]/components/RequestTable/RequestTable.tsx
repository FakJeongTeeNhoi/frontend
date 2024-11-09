import AddButton from "@/components/Common/Buttons/AddButton";
import ColorButton from "@/components/Common/Buttons/ColorButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Request } from "../../page";
import Table from "@/components/Common/Table/Table";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function RequestTable({
  spaceId,
  requests,
}: {
  spaceId: string;
  requests: Request[];
}) {
  // get reserver name, role, faculty
  const getReserverFromRequestId = (requestId: number) => {
    return { name: "John Doe", role: "Student", faculty: "Engineering" };
  };

  // get room name
  const getRoomFromRoomId = (roomId: number) => {
    return { name: "Meeting Room #1" };
  };

  // format date
  const formatDateTime = (startDateTime: string) => {
    const date = dayjs(startDateTime).tz("Asia/Bangkok");
    return date;
  };

  const onApprove = (requestId: number) => {
    // Add approve here
    console.log("Approved request with ID:", requestId);
  };

  const onCancel = (requestId: number) => {
    // Add cancel here
    console.log("Cancelled request with ID:", requestId);
  };

  const header = [
    "RESERVATION TIME",
    "RESERVER",
    "ROOM",
    "PARTICIPANTS",
    "CREATED AT",
    "STATUS",
    "",
    "",
  ];
  const rows = (requests: Request[]) => {
    return requests.map((data, index) => (
      <tr key={index} className="border-b border-gray-300">
        <td className="px-4 py-2 text-center font-semibold text-gray-800">
          <div className="font-semibold text-gray-800">
            {formatDateTime(data.start_date_time).format("DD-MM-YYYY")}
          </div>
          <div className="font-normal text-gray-500">
            {formatDateTime(data.start_date_time).format("HH:mm")} -{" "}
            {formatDateTime(data.end_date_time).format("HH:mm")}
          </div>
        </td>
        <td className="px-4 py-2 text-center">
          <div className="flex flex-col space-y-2 justify-items-center items-start">
            <div className="font-semibold text-gray-800">
              {getReserverFromRequestId(data.id).name}
            </div>
            <div className="font-normal text-gray-500">
              {getReserverFromRequestId(data.id).role},{" "}
              {getReserverFromRequestId(data.id).faculty}
            </div>
          </div>
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          {getRoomFromRoomId(data.room_id).name}
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          {data.participants.length}/
          {data.participants.length + data.pending_participants.length}
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          {formatDateTime(data.CreatedAt).format("HH:mm DD-MM-YYYY")}
        </td>
        <td className="px-6 py-2 text-end">Status</td>
        <td className="px-6 py-2 text-end">
          <ColorButton
            color="blue-400"
            label="Approve"
            onClick={() => {
              onApprove(data.id);
            }}
          />
        </td>
        <td className="px-6 py-2 text-end">
          <ColorButton
            color="red-400"
            label="Cancel"
            onClick={() => {
              onCancel(data.id);
            }}
          />
        </td>
      </tr>
    ));
  };
  return (
    <div className="space-y-6">
      <AddButton
        heading="Request"
        label="Create New Request"
        onClick={() => (window.location.href = `/staff/request/${spaceId}`)}
      />
      <Table headers={header} rows={rows(requests)} />
    </div>
  );
}

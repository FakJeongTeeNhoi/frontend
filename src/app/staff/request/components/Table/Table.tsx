/*
Get reserver - > name, role, faulty
Get room name
Add Approve(requestId) function
Add Cancel(requestId) function
*/

import Button from "../Button/Button";
import { RequestTable } from "../../page";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Status from "../Status/Status";

dayjs.extend(utc);
dayjs.extend(timezone);

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

export default function Table({ requests }: { requests: RequestTable[] }) {
  const onApprove = (requestId: number) => {
    // Add approve here
    console.log("Approved request with ID:", requestId);
  };

  const onCancel = (requestId: number) => {
    // Add cancel here
    console.log("Cancelled request with ID:", requestId);
  };

  return (
    <div className="relative overflow-x-auto rounded-t-xl">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              RESERVATION TIME
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              RESERVER
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              ROOM
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              PARTICIPANTS
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              CREATED AT
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              STATUS
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={request.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                <p className="font-medium text-[#111928]">
                  {formatDateTime(request.start_date_time).format("DD-MM-YYYY")}
                </p>
                <p>
                  {formatDateTime(request.start_date_time).format("HH:mm")} -{" "}
                  {formatDateTime(request.end_date_time).format("HH:mm")}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-[#111928]">
                  {getReserverFromRequestId(request.id).name}
                </p>
                <p>
                  {getReserverFromRequestId(request.id).role},{" "}
                  {getReserverFromRequestId(request.id).faculty}
                </p>
              </td>
              <td className="px-6 py-4 text-center text-[#111928]">
                {getRoomFromRoomId(request.room_id).name}
              </td>
              <td className="px-6 py-4 font-medium text-center">
                {request.participants.length}/
                {request.participants.length +
                  request.pending_participants.length}
              </td>
              <td className="px-6 py text-center">
                {formatDateTime(request.CreatedAt).format("HH:mm DD-MM-YYYY")}
              </td>
              <td className="px-6 py-4 place-items-center">
                <Status />
              </td>
              <td className="flex flex-row px-6 py-4 space-x-[17px] flex-nowrap">
                <Button
                  type="approve"
                  onClick={() => {
                    onApprove(request.id);
                  }}
                />

                <Button
                  type="cancel"
                  onClick={() => {
                    onCancel(request.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

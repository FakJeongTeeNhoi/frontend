"use client";

import NavbarUser from "@/components/User/NavbarUser/NavbarUser";
import Table from "@/components/Common/Table/Table";
import Tag from "@/components/Common/Tag/Tag";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CancelModal from "./components/CancelModal";
import SuccessModal from "./components/SuccessModal";
import {
  formatDate,
  formatFullDateTime,
  formatTimeRange,
} from "@/utils/ReservationDateFormat";
import {
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { cancelReservation, getMyReservation } from "@/api/reservation";
import { useSession } from "next-auth/react";
import { Reservation } from "@/api/reservation";

export default function MyReservation() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isReserverChecked, setIsReserverChecked] = useState(false);
  const [isParticipantChecked, setIsParticipantChecked] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [cancelReservationId, setCancelReservationId] = useState<number>();
  const [cancelReservationTime, setCancelReservationTime] = useState("");

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const { data: session } = useSession();
  const user_id = session?.user.user_id as unknown as number;
  const statusColorMap: { [key: string]: string } = {
    created: "bg-blue-400",
    pending: "bg-yellow-400",
    completed: "bg-green-400",
    canceled: "bg-red-400",
  };

  const breadcrumbItems = [
    { label: "My Reservation", href: "/user/myReservation" },
  ];
  const router = useRouter();
  const onSelectedStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };
  const handleAllChange = () => {
    const newValue = !isAllChecked;
    setIsAllChecked(newValue);
    setIsReserverChecked(newValue);
    setIsParticipantChecked(newValue);
  };
  const handleReserverChange = () => {
    const newValue = !isReserverChecked;
    setIsReserverChecked(newValue);
    if (newValue === false) {
      setIsAllChecked(false);
    }
    if (newValue === true && isParticipantChecked === true) {
      setIsAllChecked(true);
    }
  };
  const handleParticipantChange = () => {
    const newValue = !isParticipantChecked;
    setIsParticipantChecked(newValue);
    if (newValue === false) {
      setIsAllChecked(false);
    }
    if (newValue === true && isReserverChecked === true) {
      setIsAllChecked(true);
    }
  };
  if(!session) return null;

  //fetch data from API
  useEffect(() => {
    const fetchReservations = () => {
        try {
          getMyReservation(session.token).then((data) => {
            setReservations(data.reservations);
          });
        } catch (error) {
          console.error("Failed to fetch reservations:", error);
        }
    };
    fetchReservations();
  }, []);

  // {
  //   count: 2,
  //   reservations: [
  //     {
  //       ID: 5,
  //       CreatedAt: "2024-11-04T14:26:31.877094Z",
  //       UpdatedAt: "2024-11-04T14:26:31.877094Z",
  //       DeletedAt: null,
  //       participants: [6],
  //       pending_participants: [6432133721],
  //       status: "completed",
  //       approver: 0,
  //       start_date_time: "2024-11-01T19:14:43.4591922+07:00",
  //       end_date_time: "2024-11-01T19:18:43.4591922+07:00",
  //       room_id: 10,
  //     },
  //     {
  //       ID: 5,
  //       CreatedAt: "2024-11-04T14:26:31.877094Z",
  //       UpdatedAt: "2024-11-04T14:26:31.877094Z",
  //       DeletedAt: null,
  //       participants: [6],
  //       pending_participants: [6432133721],
  //       status: "pending",
  //       approver: 0,
  //       start_date_time: "2024-11-01T19:14:43.4591922+07:00",
  //       end_date_time: "2024-11-01T19:18:43.4591922+07:00",
  //       room_id: 10,
  //     },
  //   ],
  //   success: true,
  // };

  const headers = [
    "RESERVATION TIME",
    "RESERVER ID",
    "Co-working Space",
    "",
    "ROOM",
    "PARTICIPANTS",
    "CREATED AT",
    "STATUS",
    "",
  ];
  const filteredReservations = reservations.filter(
    (reservation) =>
      selectedStatus === "" || reservation.status === selectedStatus
  );
  const filteredReservations_with_checkbox = filteredReservations.filter(
    (reservation) => {
      const isReserver = reservation.participants[0] === user_id;
      const isParticipant = reservation.participants[0] !== user_id;
      return (
        isAllChecked ||
        (isReserverChecked && isReserver) ||
        (isParticipantChecked && isParticipant)
      );
    }
  );

  const row = () => {
    return filteredReservations_with_checkbox.map((reservation, index) => (
      <tr key={index} className="border-b border-gray-300">
        <td className="px-4 py-2 text-center">
          <div className="flex flex-col space-y-2 justify-items-center items-start">
            <div className="font-semibold text-gray-800">
              {formatDate(reservation.start_date_time)}
            </div>
            <div className="font-normal text-gray-500">
              {formatTimeRange(
                reservation.start_date_time,
                reservation.end_date_time
              )}
            </div>
          </div>
        </td>
        <td className="px-4 py-2 text-center font-semibold text-gray-800">
          {reservation.participants[0]}
        </td>
        <td className="px-4 py-2 text-center">
          <div className="flex flex-col space-y-2 justify-items-center items-start">
            <div className="font-semibold text-gray-800">
              Engineering Library
            </div>
            <div className="font-normal text-gray-500">
              Faculty of Engineering
            </div>
          </div>
        </td>
        <td className="px-4 py-2 text-center">
         
          <button>
            <RemoveRedEyeOutlinedIcon color="primary" />
          </button>
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          Meeting Room #{reservation.room_id}
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          {reservation.participants.length}{" "}
          <RemoveRedEyeOutlinedIcon color="primary" />
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          {formatFullDateTime(reservation.CreatedAt)}
        </td>
        <td className="px-4 py-2 text-center">
          <Tag
            label={reservation.status}
            color={statusColorMap[reservation.status]}
          />
        </td>
        <td className="px-6 py-2 text-end">
          {reservation.status !== "completed" &&
          reservation.status !== "canceled" ? (
            <button
              className="border-2 border-red-400 rounded-full text-red-400 font-semibold px-6 py-2 hover:text-red-500 hover:border-red-500"
              onClick={() => handleCancelClick(reservation)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="border-2 border-gray-300 rounded-full text-gray-300 font-semibold px-6 py-2 cursor-not-allowed"
              disabled
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
    ));
  };

  const handleCancelClick = (reservation: Reservation) => {
    setCancelReservationId(reservation.ID);
    setCancelReservationTime(
      `${formatDate(reservation.start_date_time)} - ${formatTimeRange(
        reservation.start_date_time,
        reservation.end_date_time
      )}`
    );
    setIsConfirmationModalOpen(true);
  };
  const handleConfirmCancel = () => {
    // Cancel the reservation
    if(!session) return null;
    if(cancelReservationId === undefined) return null;
    try {
      cancelReservation(cancelReservationId.toString(), session.token);
    } catch (error) {
      console.error("Cancel reservation error:", error);
      throw error;
    }
    setIsConfirmationModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <NavbarUser username={session.user.name} role={session.user.role || "Student"} focus="My Reservation" />
      <div className="flex flex-col py-16 px-32">
        <div className="flex flex-row justify-start items-center w-full gap-4">
          <Breadcrumb items={breadcrumbItems} />
          <FormControl variant="outlined" sx={{ width: 200 }}>
            <Select
              value={selectedStatus}
              onChange={onSelectedStatus}
              displayEmpty
            >
              <MenuItem value="">
                <p>All Status</p>
              </MenuItem>
              {Object.keys(statusColorMap).map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex space-x-4 mt-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllChecked}
                  onChange={handleAllChange}
                  color="primary"
                />
              }
              label={<span className="text-gray-800 font-semibold">All</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isReserverChecked}
                  onChange={handleReserverChange}
                  color="primary"
                />
              }
              label={
                <span className="text-gray-800 font-semibold">Reserver</span>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isParticipantChecked}
                  onChange={handleParticipantChange}
                  color="primary"
                />
              }
              label={
                <span className="text-gray-800 font-semibold">Participant</span>
              }
            />
          </div>
        </div>
        <div className="mt-[5%]">
          <Table headers={headers} rows={row()} />;
        </div>
        <CancelModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleConfirmCancel}
          message={`Are you sure you want to cancel the reservation on ${cancelReservationTime}?`}
        />
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      </div>
    </>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { getReservation, confirmParticipant, Reservation } from "@/api/reserve";
import { GetSpaceData } from "@/api/space";

import Image from "next/image";
import successConfirm from "@/assets/Reservation/successConfirm.svg";
import failConfirm from "@/assets/Reservation/failConfirm.svg";

export default function VerifyEmailReceive() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  const reservationId = params.get("reservationId");

  const [isError, setIsError] = useState(false);
  const [reservation, setReservation] = useState<Reservation>();
  const [roomName, setRoomName] = useState("");
  const [spaceLocation, setSpaceLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const formatReservationTime = (
    startDateTime: string,
    endDateTime: string
  ) => {
    const start = dayjs(startDateTime).tz("Asia/Bangkok");
    const end = dayjs(endDateTime).tz("Asia/Bangkok");

    const formattedDate = start.format("MM/DD/YYYY");
    const formattedTime = `${start.format("HH:mm")} - ${end.format("HH:mm")}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const mockRoomData = {
    spaceName: "Engineering Library",
    name: "Meeting #1",
    location: "Faculty of Engineering Building 3, Floor 3",
  };

  // Prevents `fetchData` from running twice in development
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await confirmParticipant(
          Number(reservationId),
          Number(userId)
        );

        const getData = await getReservation(
          Number(reservationId),
          Number(userId)
        );
        if (getData) {
          setReservation(getData);
          setStartTime(getData.start_date_time);
          setEndTime(getData.end_date_time);
        }

        setRoomName(mockRoomData.name);
        setSpaceLocation(mockRoomData.location);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, []);

  const handleContinue = () => {
    const token = localStorage.getItem("token");
    window.location.href = token ? "/user/myReservation" : "/user/signIn";
  };

  return (
    <div className="min-w-fit h-screen min-h-fit bg-blue-50 flex justify-center items-center">
      {isError ? (
        <div className="grid bg-white mt-[14%] mx-auto w-[75%] min-w-fit h-[86%] min-h-fit text-center gap-[6%] py-10 px-4 rounded-t-xl">
          <div className="space-y-7 place-content-center">
            <Image
              src={failConfirm}
              alt="Email Verification Icon"
              className="mx-auto size-[200px]"
            />
            <div className="space-y-2">
              <h1 className="text-gray-800 font-semibold text-[40px] leading-tight">
                Failed to joined
              </h1>
              <p className="text-[#9CA3AF] text-2xl leading-loose">
                Please try again.
              </p>
              <hr className="w-3/5 mx-auto mt-2" />
            </div>
          </div>
        </div>
      ) : (
        reservation && (
          <div className="grid bg-white mt-[14%] mx-auto w-[75%] min-w-fit h-[86%] min-h-fit text-center gap-[6%] py-10 px-4 rounded-t-xl">
            <Image
              src={successConfirm}
              alt="Email Verification Icon"
              className="mx-auto size-[200px]"
            />
            <div>
              <h1 className="text-gray-800 font-semibold text-[40px] leading-tight">
                Joined Reservation
              </h1>
              <p className="text-[#9CA3AF] text-2xl leading-loose">
                You have successfully accepted the reservation.
              </p>
              <hr className="w-3/5 mx-auto mt-2" />
            </div>
            <table className="text-[#9CA3AF] text-2xl leading-loose text-left w-[751px] place-content-center mx-auto">
              <tbody>
                <tr>
                  <td>Co-working Space:</td>
                  <td className="pl-8">
                    {mockRoomData.spaceName}
                    {/* {spaceData?.name} */}
                  </td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td className="pl-8">
                    {spaceLocation}
                    {/* {spaceData?.faculty} {spaceData?.building},{" "}
                    {spaceData?.floor} */}
                  </td>
                </tr>
                <tr>
                  <td>Room:</td>
                  <td className="pl-8">{roomName}</td>
                </tr>
                <tr>
                  <td>Reservation Time:</td>
                  <td className="pl-8">
                    {formatReservationTime(startTime, endTime)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md h-12 py-3 px-7 w-44 mt-4 mx-auto"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        )
      )}
    </div>
  );
}

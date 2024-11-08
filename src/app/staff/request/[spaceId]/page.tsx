"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Params } from "react-router-dom";
import { Alert } from "@mui/material";

import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SelectInput from "./components/SelectInput/SelectInput";
import Table from "./components/Table/Table";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "./components/ModalOverlay/ConfirmModal";
import {
  SuccessOverlay,
  SuccessOverlayProps,
} from "./components/ModalOverlay/SuccessModal";
import {
  AddOverlay,
  AddOverlayProps,
} from "./components/ModalOverlay/AddModal";
import CancelButton from "@/components/Common/Buttons/CancelButton";
import { createReserve, Reserve } from "@/api/reserve";

import Image from "next/image";
import addIcon from "@/assets/Reservation/gg_add.png";
import { combineDateAndTime } from "@/utils/CombineDateAndTime";

export type ParticipantTable = {
  userId: number;
  name: string;
  email: string;
  faculty: string;
  type: string;
};

export type RoomDataType = {
  roomId: number;
  name: string;
  description: string;
  capacity: number;
  minRequired: number;
};

export type SpaceDataType = {
  spaceId: string;
  name: string;
  description: string;
  workingHours: { startTime: string; endTime: string };
  latitude: number;
  longitude: number;
  faculty: string;
  floor: number;
  building: string;
  isAvailable: boolean;
  room: RoomDataType[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
};

export default function Reservation({ params }: { params: Params }) {
  // for user
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();
  if (user == null) {
    router.push("/user/signIn");
  }

  // params
  const { spaceId } = params;

  //breadcrumb
  const breadcrumbItems = [
    { label: "Request", href: `/user/request` },
    { label: "Make Reservation", href: `/user/request/${spaceId}` },
  ];

  // mock data
  const mockRoomData: RoomDataType[] = [
    {
      roomId: 1,
      name: "Meeting Room #1",
      description: "Room desc",
      capacity: 10,
      minRequired: 1,
    },
    {
      roomId: 2,
      name: "Meeting Room #2",
      description: "Room desc",
      capacity: 10,
      minRequired: 2,
    },
    {
      roomId: 3,
      name: "Meeting Room #3",
      description: "Room desc",
      capacity: 10,
      minRequired: 2,
    },
  ];

  const mockSpace: SpaceDataType = {
    spaceId: "85e7760a-6269-4f73-b160-a9efd73413e1",
    name: "Engineering Library",
    description: "Good facility, loud noise, hot air conditioner",
    workingHours: { startTime: "08:00", endTime: "18:00" },
    latitude: 13.737032896575903,
    longitude: 100.53316744620875,
    faculty: "Engineering",
    floor: 3,
    building: "Building 3",
    isAvailable: true,
    createdAt: new Date(),
    createdBy: "John Doe",
    updatedAt: new Date(),
    updatedBy: "John Doe",
    room: mockRoomData,
  };

  // input
  const [space, setSpace] = useState<SpaceDataType>();
  const [room, setRoom] = useState<RoomDataType>();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs>(dayjs().hour(8).minute(0));
  const [endTime, setEndTime] = useState<Dayjs>(dayjs().hour(16).minute(0));

  const [participants, setParticipants] = useState<ParticipantTable[]>([]);
  const [participantsList, setParticipantsList] = useState<number[]>([]);

  // Modal
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);

  //error
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchSpaceById = async () => {
        try {
          const spaceData = mockSpace;
          const roomData = mockRoomData.find((room) => room.roomId);

          setSpace(spaceData);
          setRoom(roomData);
        } catch (err) {
          console.error(err);
          setError("Failed to load space or room data.");
        }
      };
      fetchSpaceById();
    }
  }, [user]);

  // check validation
  const OnSubmit = () => {
    if (!room?.roomId) {
      setError("Please select Room");
      return;
    }
    if (!date) {
      setError("Please select Reserved Date");
      return;
    }
    if (startTime.isBefore(space?.workingHours.startTime)) {
      setError(`Start time should be after ${space?.workingHours.startTime}`);
      return;
    }
    if (endTime.isAfter(space?.workingHours.endTime)) {
      setError(`End time should be before ${space?.workingHours.endTime}`);
      return;
    }
    if (startTime.isAfter(endTime)) {
      setError("Start time should be earlier than End time");
      return;
    }
    if (participantsList.length < room.minRequired - 1) {
      setError(`Minimum required is ${room.minRequired}`);
      return;
    }
    if (participantsList.length > room.capacity - 1) {
      setError(`Maximum capacity is ${room.capacity}`);
      return;
    }

    setError(null);
    setConfirmVisible(true);
  };

  // confirm modal
  const ConfirmProps: ConfirmOverlayProps = {
    id: "reserve-space",
    onClose: () => setConfirmVisible(false),
    onConfirm: async () => {
      try {
        if (user) {
          const startDateTime = combineDateAndTime(
            date,
            startTime
          )?.toISOString();
          const endDateTime = combineDateAndTime(date, endTime)?.toISOString();

          console.log(Number(user.user_id), {
            pending_participants: participantsList,
            start_date_time: startDateTime,
            end_date_time: endDateTime,
            room_id: room?.roomId,
          } as Reserve);

          setConfirmVisible(false);
          setSuccessVisible(true);
        }
      } catch (error) {
        console.error("Failed to create reservation:", error);
      }
    },
    name: space ? space.name : "",
    date: date ? date.format("DD/MM/YYYY") : "",
    time: `${startTime.format("HH:mm")} - ${endTime.format("HH:mm")}`,
  };

  // success modal
  const SuccessProps: SuccessOverlayProps = {
    id: "success-reserved",
    onClose: () => setSuccessVisible(false),
    time: "15 minutes",
  };

  // add participant modal
  const AddProps: AddOverlayProps = {
    id: "add-participant",
    onClose: () => setAddVisible(false),
    onConfirm: async (user) => {
      try {
        if (user) {
          setParticipants((prevParticipants) => {
            const userExists = prevParticipants.some(
              (participant) => participant.userId === user.userId
            );

            if (!userExists) {
              // Add new participant if they do not exist
              return [
                ...prevParticipants,
                {
                  userId: user.userId,
                  account_type: "user",
                  name: user.name,
                  email: user.email,
                  faculty: user.faculty,
                  type: user.type,
                },
              ];
            } else {
              console.log("User already added");
              return prevParticipants;
            }
          });

          setParticipantsList((prevList) => {
            if (!prevList.includes(user.userId)) {
              return [...prevList, user.userId];
            }
            return prevList;
          });
        }
        console.log(participants);
        console.log(participantsList);
        setAddVisible(false);
      } catch (error) {
        console.error(error);
      }
    },
  };

  // remove participant
  const onDelete = (userId: number) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.userId !== userId
    );
    setParticipants(updatedParticipants);

    const updatedParticipantsList = updatedParticipants.map(
      (participant) => participant.userId
    );
    setParticipantsList(updatedParticipantsList);
  };

  return (
    <div className="w-full h-full min-w-fit min-h-fit text-[#111928]">
      {space && user ? (
        <>
          <ConfirmOverlay
            isVisible={isConfirmVisible}
            confirmProps={ConfirmProps}
          />
          <SuccessOverlay
            isVisible={isSuccessVisible}
            successProps={SuccessProps}
          />
          <AddOverlay isVisible={isAddVisible} addProps={AddProps} />
          <NavbarAdmin username={user.name} role={user.type} focus="Request" />
          <div className="flex flex-col py-16 px-32 gap-8">
            <Breadcrumb items={breadcrumbItems} />
            {error && <Alert severity="error">{error}</Alert>}
            <div className="grid grid-flow-row gap-14 p-6">
              <h1 className="font-bold text-2xl">Make a Reservation</h1>
              <h1 className="font-bold text-4xl">{space.name}</h1>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row space-x-7">
                  <SelectInput
                    Rooms={mockRoomData}
                    value={room}
                    onChange={setRoom}
                  />
                  <div className="space-y-4">
                    <div className="inline-flex space-x-4  w-[599px] min-w-fit items-center">
                      {/* Date picker */}
                      <label className="text-nowrap text-sm font-medium">
                        Reserve Date:
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD-MM-YYYY"
                          value={date}
                          onChange={(newDate) => setDate(newDate)}
                          minDate={dayjs()}
                          sx={{
                            backgroundColor: "white",
                            width: "100%",
                            "& .MuiSvgIcon-root": {
                              color: "#FDE68A",
                              fontSize: "30px",
                            },

                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#d1d5db",
                              },
                              "&:hover fieldset": {
                                borderColor: "#d1d5db",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#3758F9",
                                borderWidth: "1px",
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    {/* start time - end time */}
                    <label className="block text-nowrap text-sm font-medium">
                      Reserved Time:
                    </label>
                    <div className="flex flex-row items-center gap-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg
                            className="size-[30px] text-yellow-200 bg-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="time"
                          id="start-time"
                          className="bg-white w-[200px] h-[54px] border border-gray-300 text-sm rounded-lg focus:border-[#3758F9] focus:outline-none p-2.5"
                          value={startTime?.format("HH:mm")}
                          onChange={(e) => {
                            const newTime = dayjs(e.target.value, "HH:mm");
                            setStartTime(newTime);
                          }}
                        />
                      </div>
                      <span className="text-[#9CA3AF]">To</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg
                            className="size-[30px] text-yellow-200 bg-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="time"
                          id="end-time"
                          className="bg-white w-[200px] h-[54px] border border-gray-300 text-sm rounded-lg focus:border-[#3758F9] focus:outline-none p-2.5"
                          value={endTime?.format("HH:mm")}
                          onChange={(e) => {
                            const newTime = dayjs(e.target.value, "HH:mm");
                            setEndTime(newTime);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="justify-between">
                  <div className="flex justify-between items-center">
                    <p className="text-left">Participants</p>

                    {/* Add participant */}
                    <button
                      className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white inline-flex items-center font-semibold py-2 px-6 gap-2 rounded"
                      onClick={() => {
                        setAddVisible(true);
                      }}
                    >
                      <Image src={addIcon} alt="add" />
                      Add participants
                    </button>
                  </div>
                </div>
                {/* Participants' table */}
                <div className="flex-grow">
                  <Table participants={participants} onDelete={onDelete} />
                </div>
              </div>
              <div className="space-x-4 place-self-end ">
                <CancelButton
                  onClick={() => {
                    window.location.href = "/user/view";
                  }}
                />
                <button
                  className={`bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md h-12 py-3 px-7 w-44`}
                  onClick={OnSubmit}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

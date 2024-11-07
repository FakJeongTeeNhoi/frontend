"use client";
import { GetRoomData, getSpaceById } from "@/api/space";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import Table from "@/components/Common/Table/Table";
import NavbarUser from "@/components/User/NavbarUser/NavbarUser";
import SpaceViewCard from "@/components/User/SpaceViewCard/SpaceViewCard";
import { useEffect, useState } from "react";
import { SpaceData } from "../page";
import { useSearchParams, useRouter } from "next/navigation";

export type RoomDataType = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  minRequired: number;
  is_available: boolean;
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
  createAt: Date;
  createBy: string;
  updateAt: Date;
  updateBy: string;
};

export default function View({ params }: { params: { spaceId: string } }) {
  const breadcrumbItems = [
    { label: "Search", href: "/user/search" },
    { label: "View", href: `/user/search/${params.spaceId}` },
  ];

  const [space, setSpace] = useState<SpaceData>();

  const router = useRouter();
  const searchParams = useSearchParams();
  
  // How to get search params
  // useEffect(() => {
  //   const data = searchParams.get("room");
  //   const roomData: GetRoomData | null = data
  //     ? JSON.parse(decodeURIComponent(data))
  //     : null;

  //   if (roomData) {
  //     setRoom(roomData);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    const fetchSpaceById = async () => {
      try {
        const spaceData = await getSpaceById(params.spaceId);
        const space = {
          spaceId: spaceData.ID.toString(),
          name: spaceData.name,
          description: spaceData.description,
          workingHours: spaceData.working_hour,
          latitude: spaceData.latitude,
          longitude: spaceData.longitude,
          faculty: spaceData.faculty,
          floor: spaceData.floor,
          building: spaceData.building,
          isAvailable: spaceData.is_available,
          createAt: new Date(spaceData.CreatedAt),
          createBy: "",
          updateAt: new Date(spaceData.UpdatedAt),
          updateBy: "",
          opening_day: spaceData.opening_day,
          faculty_access_list: spaceData.faculty_access_list,
          room_list: spaceData.room_list,
        };
        setSpace(space);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpaceById();
  }, []);

  const headers = ["", "NAME", "CAPACITY", "MIN REQUIRED", ""];

  const rows = (mockData: GetRoomData[]) => {
    return mockData.map((data, index) => (
      <tr key={index} className="border-b border-gray-300">
        <td className="px-4 py-2 text-center font-semibold text-gray-800">
          #{index + 1}
        </td>
        <td className="px-4 py-2 text-center">
          <div className="flex flex-col space-y-2 justify-items-center items-start">
            <div className="font-semibold text-gray-800">{data.name}</div>
            <div className="font-normal text-gray-500">{data.description}</div>
          </div>
        </td>
        <td className="px-4 py-2 text-center text-gray-500">{data.capacity}</td>
        <td className="px-4 py-2 text-center text-gray-500">
          {data.min_reserve_capacity}
        </td>
        <td className="px-6 py-2 text-end">
          <button
            className="border-2 border-blue-400 rounded-full text-blue-400 font-semibold px-6 py-2 hover:text-blue-500 hover:border-blue-500"
            onClick={() => {
              const params = new URLSearchParams(searchParams as any);
              const roomString = JSON.stringify(data);
              params.set("room", encodeURIComponent(roomString));
              router.push(`/user/reservation?${params.toString()}`);
            }}
          >
            Reserve
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <NavbarUser username={"mock"} role={"student"} focus="Search" />
      <div className="flex flex-col py-16 px-32">
        <div className="flex flex-row justify-between items-center w-full">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        {space ? (
          <div className="flex flex-col mt-16 space-y-16">
            <SpaceViewCard space={space} />
            <div className="p-2 space-y-4">
              <div className="text-2xl font-semibold text-gray-800">
                List of Room
              </div>
              <Table headers={headers} rows={rows(space.room_list)} />;
            </div>
          </div>
        ) : (
          <div className="text-center w-full font-bold text-3xl mt-16">
            Loading ...
          </div>
        )}
      </div>
    </>
  );
}

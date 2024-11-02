"use client";
import { getSpaceById } from "@/api/space";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import Table from "@/components/Common/Table/Table";
import NavbarUser from "@/components/User/NavbarUser/NavbarUser";
import SpaceViewCard from "@/components/User/SpaceViewCard/SpaceViewCard";
import { useEffect, useState } from "react";

export type RoomDataType = {
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

  const [space, setSpace] = useState<SpaceDataType>();

  //mock getSpaceById data
  const mockRoomData = [
    {
      name: "Meeting Room #1",
      description: "Room desc",
      capacity: 10,
      minRequired: 5,
    },
    {
      name: "Meeting Room #2",
      description: "Room desc",
      capacity: 10,
      minRequired: 5,
    },
    {
      name: "Meeting Room #3",
      description: "Room desc",
      capacity: 10,
      minRequired: 5,
    },
  ];

  const mockSpace = {
    spaceId: "85e7760a-6269-4f73-b160-a9efd73413e1",
    name: "Engineering Library",
    description: "Good facility loud noise, hot air conditioner",
    workingHours: { startTime: "8.00", endTime: "18.00" },
    latitude: 13.737032896575903,
    longitude: 100.53316744620875,
    faculty: "Engineering",
    floor: 3,
    building: "Building 3",
    isAvailable: true,
    createAt: new Date(),
    createBy: "John Doe",
    updateAt: new Date(),
    updateBy: "John Doe",
    room: mockRoomData,
  };
  //

  useEffect(() => {
    const fetchSpaceById = async () => {
      try {
        //   const spaceData = await getSpaceById(params.spaceId)
        const spaceData = mockSpace;
        setSpace(spaceData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpaceById();
  }, []);

  const headers = ["", "NAME", "CAPACITY", "MIN REQUIRED", ""];

  const rows = (mockData: RoomDataType[]) => {
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
          {data.minRequired}
        </td>
        <td className="px-6 py-2 text-end">
          <button className="border-2 border-blue-400 rounded-full text-blue-400 font-semibold px-6 py-2 hover:text-blue-500 hover:border-blue-500">
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
              <Table headers={headers} rows={rows(space.room)} />;
            </div>
          </div>
        ) : (
          <div className="text-center w-full font-bold text-3xl mt-16">Loading ...</div>
        )}
      </div>
    </>
  );
}

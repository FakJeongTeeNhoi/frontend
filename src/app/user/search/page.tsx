"use client";

import { getAllSpace } from "@/api/space";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import { SpaceInfo } from "@/components/Staff/SpaceCard/SpaceCardDashboard";
import NavbarUser from "@/components/User/NavbarUser/NavbarUser";
import SearchBarWithFilter from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import SpaceCard from "@/components/User/SpaceCard/SpaceCard";
import { useEffect, useState } from "react";

export default function Search() {
  const breadcrumbItems = [{ label: "Search", href: "/user/search" }];
  const [spaceList, setSpaceList] = useState<SpaceInfo[]>();

  //mock getSpaceById data
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
  };

  const mockSpaceList = [mockSpace, mockSpace, mockSpace, mockSpace];
  //

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        // const spaces = await getAllSpace();
        const spaces = mockSpaceList;
        setSpaceList(spaces);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpace();
  }, []);

  return (
    <>
      <NavbarUser username={"mock"} role={"student"} focus="Search" />
      <div className="flex flex-col py-16 px-32">
        <div className="flex flex-row justify-between items-center w-full">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <SearchBarWithFilter onSearchChange={setSpaceList} />
        {spaceList ? (
          <div className="grid grid-cols-2 gap-x-32 gap-y-8 w-full mt-16">
            {spaceList.map((space, index) => (
              <SpaceCard space={space} key={index} />
            ))}
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

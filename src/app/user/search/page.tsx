"use client";

import { getAllSpace, GetRoomData, GetSpaceData } from "@/api/space";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import NavbarUser from "@/components/User/NavbarUser/NavbarUser";
import SearchBarWithFilter from "@/components/User/SearchBar/SearchBarWithFilter/SearchBarWithFilter";
import SpaceCard from "@/components/User/SpaceCard/SpaceCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type SpaceData = {
  spaceId: string;
  name: string;
  description: string;
  workingHours: string[];
  opening_day: string[];
  latitude: number;
  longitude: number;
  faculty: string;
  faculty_access_list: string[];
  floor: number;
  building: string;
  isAvailable: boolean;
  createAt: Date;
  createBy: string;
  updateAt: Date;
  updateBy: string;
  room_list: GetRoomData[];
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const breadcrumbItems = [{ label: "Search", href: "/user/search" }];
  const [spaceList, setSpaceList] = useState<SpaceData[]>();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await getAllSpace();
       
        const spaces: SpaceData[] = [];
        data.forEach((space: GetSpaceData) => {
          spaces.push({
            spaceId: space.ID.toString(),
            name: space.name,
            description: space.description,
            workingHours: space.working_hour,
            latitude: space.latitude,
            longitude: space.longitude,
            faculty: space.faculty,
            floor: space.floor,
            building: space.building,
            isAvailable: space.is_available,
            createAt: new Date(space.CreatedAt),
            createBy: "",
            updateAt: new Date(space.UpdatedAt),
            updateBy: "",
            opening_day: space.opening_day,
            faculty_access_list: space.faculty_access_list,
            room_list: space.room_list,
          });
        });
        
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
              <SpaceCard
                space={space}
                key={index}
                onView={() => {
                  router.push(`/user/search/${space.spaceId}`);
                }}
              />
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

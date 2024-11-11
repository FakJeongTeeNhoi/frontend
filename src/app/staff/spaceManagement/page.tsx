"use client";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import { CreateNewStaffButton } from "@/components/Staff/SpaceManagement/CreateNewStaffButton/CreateNewStaffButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpaceCardSpaceManagement from "@/components/Staff/SpaceCard/SpaceCardSpaceManagement";
import { SpaceData } from "@/app/user/search/page";
import { useEffect, useState } from "react";
import { getAllSpace, GetRoomData, GetSpaceData } from "@/api/space";
import addIcon from "@/assets/Reservation/gg_add.png";
import Image from "next/image";

export default function SpaceManagement() {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();
  // const user = {
  //   name: "admin",
  //   type: "admin",
  // }
  if (user == null) {
    router.push("/staff/signIn");
  }

  const breadcrumbItems = [
    { label: "Space Management", href: "/staff/spaceManagement" },
  ];
  const [spaceList, setSpaceList] = useState<SpaceData[]>();
  useEffect(() => {
    const fetchSpace = async () => {
      try {
        // TODO: change to get all space but staff only
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
      {user ? (
        <>
          <NavbarAdmin
            username={user.name}
            role={user.type}
            focus="Space Management"
          />
          <div className="flex flex-col py-16 px-32">
            <div className="flex flex-row justify-between items-center w-full">
              <Breadcrumb items={breadcrumbItems} />
              <div className="flex flex-row space-x-4">
                <button
                  className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white inline-flex items-center font-semibold py-2 px-6 gap-2 rounded"
                  onClick={() =>
                    (window.location.href = "/staff/createSpace")
                  }
                >
                  <Image src={addIcon} alt="add" />
                  Create New Space
                </button>
                <CreateNewStaffButton
                  onClick={() => {
                    router.push("/staff/signUp");
                  }}
                />
              </div>
            </div>
            {spaceList ? (
              <div className="grid grid-cols-2 gap-x-32 gap-y-8 w-full mt-16">
                {spaceList.map((space, index) => (
                  <SpaceCardSpaceManagement space={space} key={index} />
                ))}
              </div>
            ) : (
              <div className="text-center w-full font-bold text-3xl mt-16">
                Loading ...
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

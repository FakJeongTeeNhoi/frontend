import ManageButton from "@/components/Common/Buttons/ManageButton";
import LocationIcon from "@/components/Common/Icons/LocationIcon";
import TimeIcon from "@/components/Common/Icons/TimeIcon";
import Tag from "@/components/Common/Tag/Tag";
import dayjs from "dayjs";
import Map from "./Map";

export type SpaceWorkingHour = {
  startTime: string;
  endTime: string;
};

export type SpaceInfo = {
  spaceId: string;
  name: string;
  description: string;
  workingHours: SpaceWorkingHour;
  latitude: number;
  longitude: number;
  faculty: string;
  floor: number;
  building: string;
  isAvailable: boolean;
  createAt: Date;
  createBy: string;
  updateAt: Date;
  updateBy: string;
};

export default function SpaceCardDashboard({ space }: { space: SpaceInfo }) {
  return (
    <>
      <div className="flex flex-row w-full space-x-16 py-8 px-16 bg-gray-50 border-gray-300 border-2 rounded-md text-gray-800">
        <div className="bg-yellow-200 w-[500px]">
          <Map latitude={space.latitude} longitude={space.longitude} width={100} height={400}/>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="flex flex-row space-x-4 items-center">
            <div className="text-2xl font-bold">{space.name}</div>
            {space.isAvailable ? (
              <Tag label="Open" color="bg-green-400" />
            ) : (
              <Tag label="Closed" color="bg-red-400" />
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-row items-center space-x-2">
              <LocationIcon width={40} height={40} color="#FDE68A" />
              <div className="text-lg font-medium">
                Faculty of {space.faculty} {space.building}, Floor {space.floor}
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <TimeIcon width={40} height={40} color="#FDE68A" />
              <div className="text-lg font-medium">
                {space.workingHours.startTime} - {space.workingHours.endTime},
                Mon - Fri
              </div>
            </div>
            <div>{space.description}</div>
          </div>
          <div className="flex flex-row w-full space-x-32">
            <ManageButton
              onClick={() => {
                console.log("Manage Page");
              }}
            />
            <div>
              <div className="text-gray-500">
                Created At: {dayjs(space.createAt).format("HH:mm MM-DD-YYYY")}{" "}
                By: {space.createBy}
              </div>
              <div className="text-gray-500">
                Updated At: {dayjs(space.updateAt).format("HH:mm MM-DD-YYYY")}{" "}
                By: {space.updateBy}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

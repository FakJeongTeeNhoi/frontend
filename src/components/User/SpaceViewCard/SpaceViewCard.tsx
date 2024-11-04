import LocationIcon from "@/components/Common/Icons/LocationIcon";
import TimeIcon from "@/components/Common/Icons/TimeIcon";
import Tag from "@/components/Common/Tag/Tag";
import Map from "@/components/Staff/SpaceCard/Map";
import { SpaceInfo } from "@/components/Staff/SpaceCard/SpaceCardDashboard";
import dayjs from "dayjs";

export default function SpaceViewCard({ space }: { space: SpaceInfo }) {
  return (
    <>
      <div className="flex flex-row w-full space-x-16 py-8 px-16 bg-gray-50 border-gray-300 border-2 rounded-md text-gray-800">
        <div className="bg-yellow-200 w-full">
          <Map
            latitude={space.latitude}
            longitude={space.longitude}
            width={100}
            height={400}
          />
        </div>
        <div className="flex flex-col space-y-8 w-full justify-between">
          <div>
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
                  Faculty of {space.faculty} {space.building}, Floor{" "}
                  {space.floor}
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
          </div>
          <div className="flex flex-col w-full items-end">
            <div className="text-gray-500">
              Created At: {dayjs(space.createAt).format("HH:mm MM-DD-YYYY")} By:{" "}
              {space.createBy}
            </div>
            <div className="text-gray-500">
              Updated At: {dayjs(space.updateAt).format("HH:mm MM-DD-YYYY")} By:{" "}
              {space.updateBy}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

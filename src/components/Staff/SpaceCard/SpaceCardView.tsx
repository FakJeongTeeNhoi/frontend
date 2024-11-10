import LocationIcon from "@/components/Common/Icons/LocationIcon";
import TimeIcon from "@/components/Common/Icons/TimeIcon";
import Tag from "@/components/Common/Tag/Tag";
import dayjs from "dayjs";
import Map from "./Map";
import ToggleButton from "@/components/Common/Buttons/ToggleButton";
import ButtonWithIcon from "@/components/Common/Buttons/ButtonWithIcon";
import { DeleteOverlay, DeleteOverlayProps } from "../Modal/DeleteSpaceModal";
import { useState } from "react";
import { SuccessOverlay, SuccessOverlayProps } from "../Modal/SuccessModal";

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

export default function SpaceCardView({ space }: { space: SpaceInfo }) {
  // set open-close for each room
  const onToggle = (spaceId: number, checked: boolean) => {
    console.log(`Change space id: ${spaceId}, checked: ${checked}`);
  };

  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  // delete modal
  const DeleteProps: DeleteOverlayProps = {
    id: "delete-space",
    onClose: () => setDeleteVisible(false),
    onConfirm: async () => {
      try {
        // delete space here
        console.log(`delete spaceId : ${space?.spaceId}`);
        setDeleteVisible(false);
        setSuccessVisible(true);
      } catch (error) {
        console.error("Failed to create reservation:", error);
      }
    },
    name: space ? space.name : "",
  };

  // success modal
  const SuccessProps: SuccessOverlayProps = {
    id: "success-reserved",
    onClose: () => setSuccessVisible(false),
    header: "Deleted Space Successful",
    text: `‘${space ? space.name : ""}’ has completely been deleted`,
  };

  return (
    <>
      <DeleteOverlay isVisible={isDeleteVisible} deleteProps={DeleteProps} />
      <SuccessOverlay
        isVisible={isSuccessVisible}
        successProps={SuccessProps}
      />
      <div className="flex flex-row w-full justify-between space-x-16 py-8 px-16 bg-gray-50 border-gray-300 border-2 rounded-md text-gray-800">
        <div className="bg-yellow-200 w-[500px]">
          <Map
            latitude={space.latitude}
            longitude={space.longitude}
            width={100}
            height={400}
          />
        </div>
        <div className="flex flex-col space-y-8 grow">
          <div className="flex flex-row space-x-4 items-center">
            <div className="text-2xl font-bold">{space.name}</div>
            <ToggleButton
              id={Number(space.spaceId)}
              initialChecked={!space.isAvailable}
              onToggle={onToggle}
            />
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
        <div className="ml-auto justify-items-end right-0 flex flex-col space-y-2">
          <ButtonWithIcon
            label="Edit"
            onClick={() =>
              (window.location.href = `/staff/createSpace/${space.spaceId}`)
            }
          />
          <ButtonWithIcon
            label="Delete"
            onClick={() => setDeleteVisible(true)}
          />
        </div>
      </div>
    </>
  );
}

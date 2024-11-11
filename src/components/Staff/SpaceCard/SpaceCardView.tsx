// add delete space by id
// and also GetSpaceData doesn't have CreatedBy and UpdatedBy field

import LocationIcon from "@/components/Common/Icons/LocationIcon";
import TimeIcon from "@/components/Common/Icons/TimeIcon";
import dayjs from "dayjs";
import Map from "./Map";
import ToggleButton from "@/components/Common/Buttons/ToggleButton";
import ButtonWithIcon from "@/components/Common/Buttons/ButtonWithIcon";
import { DeleteOverlay, DeleteOverlayProps } from "../Modal/DeleteSpaceModal";
import { useState } from "react";
import { SuccessOverlay, SuccessOverlayProps } from "../Modal/SuccessModal";
import { GetSpaceData, deleteSpace } from "@/api/space";
import { formatOpeningDay } from "@/utils/FormatOpeningDay";

export default function SpaceCardView({ space }: { space: GetSpaceData }) {
  const today = new Date();
  const dayIndex = today.getDay();

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
        console.log(`delete spaceId : ${space.ID}`);
        const response = await deleteSpace(String(space.ID));
        console.log("Delete space response: ", response);
        setDeleteVisible(false);
        setSuccessVisible(true);
      } catch (error) {
        console.error("Failed to delete reservation:", error);
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
              id={space.ID}
              initialChecked={!space.is_available}
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
                {space.working_hour[dayIndex]},{" "}
                {formatOpeningDay(space.opening_day)}
              </div>
            </div>
            <div>{space.description}</div>
          </div>
          <div className="flex flex-row w-full space-x-32">
            <div>
              <div className="text-gray-500">
                Created At: {dayjs(space.CreatedAt).format("HH:mm MM-DD-YYYY")}{" "}
                {/* By: {space.CreatedBy} */}
              </div>
              <div className="text-gray-500">
                Updated At: {dayjs(space.UpdatedAt).format("HH:mm MM-DD-YYYY")}{" "}
                {/* By: {space.UpdatedBy} */}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto justify-items-end right-0 flex flex-col space-y-2">
          {/* <ButtonWithIcon
            label="Edit"
            onClick={() =>
              (window.location.href = `/staff/createSpace/${space.ID}`)
            }
          /> */}
          {/* <ButtonWithIcon
            label="Delete"
            onClick={() => setDeleteVisible(true)}
          /> */}
        </div>
      </div>
    </>
  );
}

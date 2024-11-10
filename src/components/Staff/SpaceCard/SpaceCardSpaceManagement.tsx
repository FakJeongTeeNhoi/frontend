import { SpaceData } from "@/app/user/search/page";
import LocationIcon from "@/components/Common/Icons/LocationIcon";
import TimeIcon from "@/components/Common/Icons/TimeIcon";
import Tag from "@/components/Common/Tag/Tag";
import Map from "@/components/Staff/SpaceCard/Map";
import { SpaceWorkingHour } from "@/components/Staff/SpaceCard/SpaceCardDashboard";
import { formatOpeningDay } from "@/utils/FormatOpeningDay";
import ButtonWithIcon from "@/components/Common/Buttons/ButtonWithIcon";
import { DeleteOverlay, DeleteOverlayProps } from "../Modal/DeleteSpaceModal";
import { useState } from "react";
import { SuccessOverlay, SuccessOverlayProps } from "../Modal/SuccessModal";

// export type SpacePreviewInfo = {
//   spaceId: string;
//   name: string;
//   description: string;
//   workingHours: SpaceWorkingHour;
//   latitude: number;
//   longitude: number;
//   faculty: string;
//   floor: number;
//   building: string;
//   isAvailable: boolean;
// };
export default function SpaceCard({ space }: { space: SpaceData }) {
  const today = new Date();
  const dayIndex = today.getDay();

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
    <div className="flex flex-row space-x-8 py-8 px-4 bg-gray-50 border-gray-300 border-2 rounded-md text-gray-800 justify-between">
      <DeleteOverlay isVisible={isDeleteVisible} deleteProps={DeleteProps} />
      <SuccessOverlay
        isVisible={isSuccessVisible}
        successProps={SuccessProps}
      />
      <div className="flex flex-col space-y-2">
        <div>
          <Map
            latitude={space.latitude}
            longitude={space.longitude}
            width={100}
            height={200}
          />
        </div>
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
            <LocationIcon width={30} height={30} color="#FDE68A" />
            <div className="text-lg font-medium">
              Faculty of {space.faculty} {space.building}, Floor {space.floor}
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <TimeIcon width={30} height={30} color="#FDE68A" />
            <div className="text-lg font-medium">
              {space.workingHours[dayIndex]},{" "}
              {formatOpeningDay(space.opening_day)}
            </div>
          </div>
          <div>{space.description}</div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <ButtonWithIcon
          label="View"
          onClick={() =>
            (window.location.href = `/staff/spaceManagement/${space.spaceId}`)
          }
        />
        {/* <ButtonWithIcon
          label="Edit"
          onClick={() =>
            (window.location.href = `/staff/space/space/${space.spaceId}`)
          }
        /> */}
        <ButtonWithIcon label="Delete" onClick={() => setDeleteVisible(true)} />
      </div>
    </div>
  );
}

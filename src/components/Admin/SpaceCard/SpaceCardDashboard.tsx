import ManageButton from "@/components/Common/Buttons/ManageButton";
import LocationIcon from "@/components/Common/Icons/LocationIcon";
import TimeIcon from "@/components/Common/Icons/TimeIcon";
import Tag from "@/components/Common/Tag/Tag";

export default function SpaceCardDashboard() {
  return (
    <>
      <div className="flex flex-row w-full space-x-16 py-8 px-16 bg-gray-50 border-gray-300 border-2 rounded-md text-gray-800">
        <div className="bg-yellow-200 w-[500px]">Google API</div>
        <div className="flex flex-col space-y-8">
          <div className="flex flex-row space-x-4 items-center">
            <div className="text-2xl font-bold">Engineering Library</div>
            <Tag label="Open" color="bg-green-400" />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-row items-center space-x-2">
              <LocationIcon width={40} height={40} color="#FDE68A" />
              <div className="text-lg font-medium">
                Faculty of Engineering Building 3, Floor 3rd
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <TimeIcon width={40} height={40} color="#FDE68A" />
              <div className="text-lg font-medium">
                8.00 AM - 6.00 PM, Mon - Fri
              </div>
            </div>
            <div>Good facility loud noise, hot air conditioner </div>
          </div>
          <div className="flex flex-row w-full space-x-32">
            <ManageButton
              onClick={() => {
                console.log("Manage Page");
              }}
            />
            <div>
              <div className="text-gray-500">Created At: 10-02-2019 By: John Doe</div>
              <div className="text-gray-500">Updated At: 10-02-2019 By: John Doe</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

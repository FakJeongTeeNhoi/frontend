"use client";

import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import SpaceCardDashboard, {
  SpaceInfo,
} from "@/components/Staff/SpaceCard/SpaceCardDashboard";
import DashboardChart from "@/components/Staff/DashboardChart/DashboardChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();
  if (user == null) {
    router.push("/staff/signIn");
  }

  //mock getSpaceById data
  const space = {
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

  const spaces = [
    {
      value: "e44a7bca-8d4f-4171-9bb2-3d803c1e72f4",
      label: "Engineering Library",
    },
    {
      value: "Office of Academic Resource",
      label: "Office of Academic Resource",
    },
    {
      value: "Communication Arts Library",
      label: "Communication Arts Library",
    },
  ];
  //

  const breadcrumbItems = [{ label: "Dashboard", href: "/staff/dashboard" }];
  const [focusSpace, setSpace] = useState<SpaceInfo>(space);

  const onSelectedSpace = (event: SelectChangeEvent) => {
    const selectedSpace = spaces.find(
      (space) => space.label === event.target.value
    );
    console.log(`fetched space id: ${selectedSpace?.value}`);
    //fetch GetSpaceById
    setSpace(space);
  };

  return (
    <>
      {user ? (
        <>
          <NavbarAdmin
            username={user.name}
            role={user.type}
            focus="Dashboard"
          />
          <div className="flex flex-col py-16 px-32">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-col mt-16 space-y-16">
              <div className="flex flex-row items-center space-x-4">
                <div className="flex flex-row items-center">
                  <SearchIcon width={40} height={40} color="#1F2937" />
                  <div className="text-2xl font-semibold text-gray-800">
                    Co-working Space:
                  </div>
                </div>
                <FormControl variant="outlined" sx={{ width: 500 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={focusSpace ? focusSpace.name : ""}
                    label="Age"
                    onChange={onSelectedSpace}
                    displayEmpty
                    renderValue={(selected) =>
                      !selected || selected.length === 0
                        ? "Select Space"
                        : selected
                    }
                  >
                    {spaces.map((space) => (
                      <MenuItem key={space.label} value={space.label}>
                        {space.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <SpaceCardDashboard space={space} />
              <DashboardChart
                spaceId={space.spaceId}
                openingTime={space.workingHours}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

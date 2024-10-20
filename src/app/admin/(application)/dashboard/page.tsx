"use client";

import NavbarAdmin from "@/components/Admin/NavbarAdmin/NavbarAdmin";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import SpaceCardDashboard, { SpaceInfo } from "@/components/Admin/SpaceCard/SpaceCardDashboard";
import DashboardChart from "@/components/Admin/DashboardChart/DashboardChart";

export default function Dashboard() {
  //mock getSpaceById data
  const space = {
    spaceId: "e44a7bca-8d4f-4171-9bb2-3d803c1e72f4",
    name: "Engineering Library",
    description: "Good facility loud noise, hot air conditioner",
    workingHours: { startTime: "8.00", endTime: "18.00" },
    latitude: 1,
    longitude: 1,
    faculty: "Engineering",
    floor: 3,
    building: "Building 3",
    isAvailable: true,
    createAt: new Date(),
    createBy: "John Doe",
    updateAt: new Date(),
    updateBy: "John Doe"
  };

  const spaces = [
    { value: "e44a7bca-8d4f-4171-9bb2-3d803c1e72f4", label: "Engineering Library" },
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

  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }];
  const [focusSpace, setSpace] = useState<SpaceInfo>(space);



  const onSelectedSpace = (event: SelectChangeEvent) => {
    const selectedSpace = spaces.find(space => space.label === event.target.value);
    console.log(`fetched space id: ${selectedSpace?.value}`)
    //fetch GetSpaceById
    setSpace(space);
  };

  return (
    <>
      <NavbarAdmin username="Moodeng" role="Admin" focus="Dashboard" />
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
                value={focusSpace? focusSpace.name : ""}
                label="Age"
                onChange={onSelectedSpace}
                displayEmpty
                renderValue={(selected) =>
                 !selected || selected.length === 0 ? "Select Space" : selected
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
          <SpaceCardDashboard space={space}/>
          <DashboardChart spaceId={space.spaceId} openingTime={space.workingHours}/>
        </div>
      </div>
    </>
  );
}

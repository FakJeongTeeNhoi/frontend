"use client";

import NavbarAdmin from "@/components/Admin/NavbarAdmin/NavbarAdmin";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import SpaceCardDashboard from "@/components/Admin/SpaceCard/SpaceCardDashboard";
import DashboardChart from "@/components/Admin/DashboardChart/DashboardChart";

export default function Dashboard() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }];
  const [focusSpace, setSpace] = useState("");

  const onSelectedSpace = (event: SelectChangeEvent) => {
    setSpace(event.target.value);
  };

  //value should be space id

  const spaces = [
    { value: "Engineering Library", label: "Engineering Library" },
    {
      value: "Office of Academic Resource",
      label: "Office of Academic Resource",
    },
    {
      value: "Communication Arts Library",
      label: "Communication Arts Library",
    },
  ];

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
                value={focusSpace}
                label="Age"
                onChange={onSelectedSpace}
                displayEmpty
                renderValue={(selected) =>
                  selected.length === 0 ? "Select Space" : selected
                }
              >
                {spaces.map((space) => (
                  <MenuItem key={space.value} value={space.value}>
                    {space.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <SpaceCardDashboard />
          <DashboardChart />
        </div>
      </div>
    </>
  );
}

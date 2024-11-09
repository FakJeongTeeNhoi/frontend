/*
- Get Request by space id -> requests:RequestTable[] line 113
*/

"use client";

import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SpaceInfo } from "@/components/Staff/SpaceCard/SpaceCardDashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import addIcon from "@/assets/Reservation/gg_add.png";
import RequestTable from "./components/RequestTable/RequestTable";

export interface Request {
  id: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  participants: Number[];
  pending_participants: Number[];
  status: string;
  approver: Number;
  start_date_time: string;
  end_date_time: string;
  room_id: number;
}

// mock request
const mockRequest: Request[] = [
  {
    id: 45,
    CreatedAt: "2024-11-07T15:28:33.342217Z",
    UpdatedAt: "2024-11-07T15:47:16.855698Z",
    DeletedAt: null,
    participants: [6431316621],
    pending_participants: [6431315421],
    status: "cancelled",
    approver: 0,
    start_date_time: "2024-11-07T01:00:18.085Z",
    end_date_time: "2024-11-07T09:00:18.085Z",
    room_id: 1,
  },
  {
    id: 44,
    CreatedAt: "2024-11-07T15:28:33.342217Z",
    UpdatedAt: "2024-11-07T15:47:16.855698Z",
    DeletedAt: null,
    participants: [6431316621],
    pending_participants: [6431315421],
    status: "pending",
    approver: 0,
    start_date_time: "2024-11-07T01:00:18.085Z",
    end_date_time: "2024-11-07T09:00:18.085Z",
    room_id: 1,
  },
];

export default function Request() {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();

  // Redirect to signIn if user is not found
  if (!user) {
    router.push("/staff/signIn");
    return null; // Prevent rendering while redirecting
  }

  // Mock space data
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

  useEffect(() => {
    if (user) {
      const fetchRequestBySpaceId = async () => {
        try {
          // get requests here
          const requestData = mockRequest;
          setRequests(requestData);
          console.log("Requests data: ", requestData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchRequestBySpaceId();
    }
  }, [space]);

  const breadcrumbItems = [{ label: "Dashboard", href: "/staff/dashboard" }];
  const [focusSpace, setSpace] = useState<SpaceInfo>(space);
  const [requests, setRequests] = useState<Request[]>([]);

  const onSelectedSpace = (event: SelectChangeEvent) => {
    const selectedSpace = spaces.find(
      (space) => space.label === event.target.value
    );
    console.log(`fetched space id: ${selectedSpace?.value}`);
    // Fetch GetSpaceById
    setSpace(space);
  };

  return (
    <>
      <NavbarAdmin username={user.name} role={user.type} focus="Dashboard" />
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
            <FormControl
              variant="outlined"
              sx={{ width: 500, backgroundColor: "white" }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={focusSpace ? focusSpace.name : ""}
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
          <div className="justify-between">
            <div className="flex justify-between items-center">
              <p className="text-left font-bold text-2xl">{space.name}</p>

              {/* create new request */}
              <button
                className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white inline-flex items-center font-semibold py-2 px-6 gap-2 rounded"
                onClick={() => {
                  router.push(`/staff/request/${space.spaceId}`);
                }}
              >
                <Image src={addIcon} alt="add" />
                Create New Request
              </button>
            </div>
          </div>
          {/* Request table */}
          <div className="flex-grow">
            <RequestTable requests={requests} />
          </div>
        </div>
      </div>
    </>
  );
}

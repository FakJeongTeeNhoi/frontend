// add get staffs by spaceId
// add get rooms by spaceId
// add get requests by spaceId

"use client";

import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import SpaceCardView from "@/components/Staff/SpaceCard/SpaceCardView";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StaffTable from "./components/StaffTable/StaffTable";
import RoomTable from "./components/RoomTable/RoomTable";
import RequestTable from "./components/RequestTable/RequestTable";
import { GetRoomData, getSpaceById, GetSpaceData } from "@/api/space";
import { StaffAccount } from "@/api/user";

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

//mock staff
const mockStaff: StaffAccount[] = [
  {
    ID: 18,
    CreatedAt: "0001-01-01T00:00:00Z",
    UpdatedAt: "0001-01-01T00:00:00Z",
    DeletedAt: null,
    email: "a@gmail.com",
    password: "staff",
    name: "a",
    faculty: "Engineering",
    type: "staff",
    is_verify: true,
  },
  {
    ID: 17,
    CreatedAt: "0001-01-01T00:00:00Z",
    UpdatedAt: "0001-01-01T00:00:00Z",
    DeletedAt: null,
    email: "napaht@gmail.com",
    password: "staff",
    name: "naphat",
    faculty: "Engineering",
    type: "staff",
    is_verify: true,
  },
];

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

// mock room data
const mockRoomData: GetRoomData[] = [
  {
    ID: 1,
    name: "Meeting",
    description: "desc",
    room_number: "1",
    capacity: 5,
    min_reserve_capacity: 2,
    is_available: true,
    CreatedAt: `${new Date()}`,
    UpdatedAt: `${new Date()}`,
    DeletedAt: null,
  },
  {
    ID: 2,
    name: "Meeting",
    description: "desc",
    room_number: "2",
    capacity: 5,
    min_reserve_capacity: 2,
    is_available: false,
    CreatedAt: `${new Date()}`,
    UpdatedAt: `${new Date()}`,
    DeletedAt: null,
  },
  {
    ID: 3,
    name: "Meeting",
    description: "desc",
    room_number: "3",
    capacity: 5,
    min_reserve_capacity: 2,
    is_available: true,
    CreatedAt: `${new Date()}`,
    UpdatedAt: `${new Date()}`,
    DeletedAt: null,
  },
];

// Mock space data
const mockSpace: GetSpaceData = {
  ID: 1,
  name: "Engineering Library",
  description: "Good facility loud noise, hot air conditioner",
  working_hour: ["8.00 - 18.00"],
  opening_day: [""],
  latitude: 13.737032896575903,
  longitude: 100.53316744620875,
  faculty: "Engineering",
  floor: 3,
  building: "Building 3",
  is_available: true,
  CreatedAt: `${new Date()}`,
  // created_by: "John Doe",
  UpdatedAt: `${new Date()}`,
  // updated_by: "John Doe",
  room_list: mockRoomData,
  head_staff: "",
  staff_list: [17],
  faculty_access_list: ["Engineering"],
  DeletedAt: null,
  type: "",
};

export default function View({ params }: { params: { spaceId: string } }) {
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const router = useRouter();
  if (!user) {
    router.push("/staff/signIn");
  }

  const breadcrumbItems = [
    { label: "Space Management", href: "/staff/spaceManagement" },
    { label: "View", href: `/staff/spaceManagement/${params.spaceId}` },
  ];

  const [space, setSpace] = useState<GetSpaceData>();
  const [staffs, setStaffs] = useState<StaffAccount[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [rooms, setRooms] = useState<GetRoomData[]>([]);
  const [activeTab, setActiveTab] = useState("Staff");

  useEffect(() => {
    const fetchSpaceById = async () => {
      try {
        // Get spaceData
        const spaceData = mockSpace;
        // const spaceData = await getSpaceById(params.spaceId);
        setSpace(spaceData);
        // console.log("Space data: ", spaceData);

        // Get staff[]
        const staffData = mockStaff;
        setStaffs(staffData);
        // console.log("staffs data: ", staffData);

        // Get request[]
        const requestData = mockRequest;
        setRequests(requestData);
        // console.log("Requests data: ", requestData);

        // Get room[]
        const roomData = mockRoomData;
        setRooms(roomData);
        // console.log("Rooms data: ", roomData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpaceById();
  }, []);

  return (
    <>
      {user && space ? (
        <>
          <NavbarAdmin
            username={user.name}
            role={user.type}
            focus="Dashboard"
          />
          <div className="flex flex-col py-16 px-32 space-y-8">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-col space-y-8">
              <SpaceCardView space={space} />

              <div className="mb-7 border-b border-gray-200">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  role="tablist"
                >
                  {["Staff", "Room", "Request"].map((tab) => (
                    <li key={tab} className="me-2" role="presentation">
                      <button
                        className={`inline-block p-4 border-b-2 rounded-t-lg text-xl ${
                          activeTab === tab
                            ? "font-bold border-blue-400 text-blue-400"
                            : "hover:border-gray-400 text-gray-400 font-medium"
                        }`}
                        onClick={() => setActiveTab(tab)}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="default-tab-content">
                {activeTab === "Staff" && (
                  <StaffTable existingStaffs={staffs} />
                )}
                {activeTab === "Room" && <RoomTable existingRooms={rooms} />}
                {activeTab === "Request" && (
                  <RequestTable spaceId={params.spaceId} requests={requests} />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

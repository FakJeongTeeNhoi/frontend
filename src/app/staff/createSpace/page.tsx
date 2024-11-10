"use client";
import NavbarAdmin from "@/components/Staff/NavbarAdmin/NavbarAdmin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Map from "@/components/Staff/SpaceCard/Map";
import TimePickerInput from "@/components/Common/TimePicker/TimePickerInput";
import dayjs, { Dayjs } from "dayjs";
import { getStaffs, Staff } from "@/api/staff";
import { createSpace, RoomCreationInfo, SpaceCreationInfo } from "@/api/space";

/* This is area for boss */

const fetchStaffData = async () => {
  return await getStaffs();
};

const submitForm = async (space: SpaceCreationInfo) => {
  try {
    console.log("Creating room:", space);
    const result = await createSpace(space);
    console.log("Create space result:", result);
    if (result?.ID) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Create space error:", error);
    throw error;
  }
};
/* End of boss area */

export default function CreateSpace() {
  /* Uncomment this in case production */
  // const { data: session } = useSession();
  // const user = session ? session.user : null;
  /* End of production */

  /* This part is only for development purposes */
  const user = {
    name: "John Doe",
    type: "Admin",
  };
  /* End of development purposes */
  const router = useRouter();
  if (user == null) {
    router.push("/staff/signIn");
  }

  /* Use state */
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<SpaceCreationInfo>({
    name: "",
    type: "Co-working Space",
    description: "",
    faculty: "Engineering",
    building: "",
    floor: "",
    latitude: 0,
    longitude: 0,
    startTime: dayjs(),
    endTime: dayjs(),
    openingDays: [] as string[],
    accessList: [] as string[],
    staffs: [] as Staff[],
    rooms: [] as RoomCreationInfo[],
  });
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<Staff>({} as Staff);
  const [currentRoom, setCurrentRoom] = useState<RoomCreationInfo>({
    id: 0,
    name: "",
    description: "",
    capacity: 0,
    minRequire: 0,
    roomNumber: "",
  });
  const [showMedal, setShowMedal] = useState<boolean[]>([false, false]);

  /* Constant */
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const faculties = ["Engineering", "Art", "Science"];

  /* Use Effect */
  useEffect(() => {
    const fetchData = async () => {
      const staffData = await fetchStaffData();
      console.log(staffData);
      setStaffList(staffData);
      setFilteredStaff(staffData);
      setSelectedStaff(staffData[0]);
    }
    fetchData();
  }, []);

  /* Handle function for currentPage */
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const cancelPage = () => {
    router.push("/staff/spaceManagement");
  };

  /* Handle function for formData */
  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | any
  ) => {
    const { name, value } = e.target;
    // If the value is a date (in this case, handle the DatePicker)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // For non-date fields
    }));
    console.log(name, value);
    console.log(formData);
  };

  const handleTimeChange = (value: Dayjs | null, name: string) => {
    if (value === null) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log("Start time: ", value);
    console.log(formData);
  };

  const handleCheckboxChange = (
    name: "openingDays" | "accessList",
    value: string
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: prevFormData[name].includes(value)
        ? prevFormData[name].filter((item) => item !== value)
        : [...prevFormData[name], value],
    }));
  };

  const ValidateSpace = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.faculty ||
      !formData.building ||
      !formData.floor ||
      formData.openingDays.length === 0 ||
      formData.accessList.length === 0 ||
      formData.staffs.length === 0 ||
      formData.rooms.length === 0
    ) {
      alert("Please fill in all fields correctly.");
      return false;
    }

    if (formData.startTime.isAfter(formData.endTime)) {
      alert("Start time must be before end time.");
      return false;
    }
    nextPage();

    return true;
  };

  const handleCreateSpace = async () => {
    formData.latitude = Number(formData.latitude);
    formData.longitude = Number(formData.longitude);
    const createdSpace = await submitForm(formData);
    if (createdSpace) {
      // Handle the successful creation (e.g., update state or show a success message)
      console.log("Space created successfully");
      nextPage();
    }
  };

  /* Handle function for staff */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const query = event.target.value.toLowerCase();
    setFilteredStaff(
      staffList.filter((staff) => staff.name.toLowerCase().includes(query))
    );
  };

  const handleSelectStaff = (staff: any) => {
    setSelectedStaff(staff);
  };

  const handleAddStaff = () => {
    if (formData.staffs.includes(selectedStaff)) {
      return; // Do nothing if staff is already in the list
    }

    console.log(selectedStaff);

    setFormData((prevFormData) => ({
      ...prevFormData,
      staffs: [...prevFormData.staffs, selectedStaff], // Add the staff if not already present
    }));
  };

  const handleRemoveStaff = (staffID: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      staffs: prevFormData.staffs.filter((item) => item.id !== staffID),
    }));
  };

  /* Handle function for room */
  const handleRoomChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | any
  ) => {
    const { name, value } = e.target;
    // If the value is a date (in this case, handle the DatePicker)
    setCurrentRoom((prevFormData) => ({
      ...prevFormData,
      [name]: value, // For non-date fields
    }));

    console.log(name, value);
  };

  const handleAddRoom = () => {
    if (
      !currentRoom.name ||
      !currentRoom.description ||
      currentRoom.capacity <= 0 ||
      currentRoom.minRequire <= 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }
    currentRoom.capacity = Number(currentRoom.capacity);
    currentRoom.minRequire = Number(currentRoom.minRequire);
    if (
      !Number.isInteger(currentRoom.capacity) ||
      !Number.isInteger(currentRoom.minRequire)
    ) {
      alert("Capacity and Min Capacity must be integers.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      rooms: [...prevFormData.rooms, currentRoom], // Add the staff if not already present
    }));
    currentRoom.id = currentRoom.id + 1;
    handleRoomClear();
    handleMedal(1, false);
  };

  const handleRemoveRoom = (roomID: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rooms: prevFormData.rooms.filter((item) => item.id !== roomID),
    }));
  };

  const handleRoomClear = () => {
    setCurrentRoom({
      id: currentRoom.id,
      name: "",
      description: "",
      capacity: 0,
      minRequire: 0,
      roomNumber: "",
    });
  };

  const handleMedal = (index: number, state: boolean) => {
    setShowMedal((prev) => {
      const newState = [...prev];
      newState[index] = state;
      return newState;
    });
  };

  /* Dej code end here */
  return (
    <>
      {user ? (
        <>
          <NavbarAdmin
            username={user.name}
            role={user.type}
            focus="Space Management"
          />
          <div className="flex flex-col items-center text-black">
            <h1 className="text-6xl text-center font-bold mt-8">
              Create Space
            </h1>
            {/* This is page one */}
            {currentPage === 0 && (
              <section className="bg-white shadow-md rounded-lg p-12 mb-8 mt-8 w-4/12">
                <div className="flex gap-12 justify-start">
                  <div className="w-1/2">
                    <label className="font-bold text-xl">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border p-2 block w-full mb-4"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="font-bold text-xl">Type</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Co-working Space">Co-working Space</option>
                      <option value="Library">Library</option>
                      <option value="Laboratory">Laboratory</option>
                    </select>
                  </div>
                </div>
                <label htmlFor="description" className="font-bold text-xl">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4} // Sets the height of the textarea
                  maxLength={50} // Limits the input to 50 characters
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter a description (max 50 characters)"
                  onChange={handleChange}
                  value={formData.description}
                />
                <div className="flex gap-12 justify-start py-2">
                  <div className="w-1/2">
                    <label className="font-bold text-xl">Faculty</label>
                    <select
                      id="faculty"
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Art">Art</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="font-bold text-xl">Building</label>
                    <input
                      type="text"
                      id="building"
                      name="building"
                      placeholder="Building"
                      value={formData.building}
                      onChange={handleChange}
                      className="border p-2 block w-full mb-4"
                    />
                  </div>
                </div>
                <div className="flex gap-12 justify-start py-2">
                  <div className="w-1/2"></div>
                  <div className="w-1/2">
                    <label className="font-bold text-xl">Floor</label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      placeholder="Floor"
                      value={formData.floor}
                      onChange={handleChange}
                      className="border p-2 block w-full mb-4"
                    />
                  </div>
                </div>
                <div className="flex gap-12 py-2">
                  <Map
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    width={200}
                    height={200}
                  />
                  <div>
                    <label className="font-bold text-xl">Latitude</label>
                    <input
                      type="number"
                      id="latitude"
                      name="latitude"
                      placeholder="0"
                      value={formData.latitude}
                      onChange={handleChange}
                      className="border p-2 block w-full mb-4"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-xl">Longitude</label>
                    <input
                      type="number"
                      id="longitude"
                      name="longitude"
                      placeholder="0"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="border p-2 block w-full mb-4"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label className="font-bold text-xl">Working Hour</label>
                  <div className="flex items-center space-x-4">
                    <TimePickerInput
                      onChange={(value) => handleTimeChange(value, "startTime")}
                    />
                    <span className="mx-4">To</span>
                    <TimePickerInput
                      onChange={(value) => handleTimeChange(value, "endTime")}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label className="font-bold text-xl">Opening Day</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {days.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleCheckboxChange("openingDays", day)}
                        className={`px-3 py-1 border rounded ${
                          formData.openingDays.includes(day)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="py-2">
                  <label className="font-bold text-xl">
                    Faculty Access List
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {faculties.map((faculty) => (
                      <button
                        key={faculty}
                        type="button"
                        onClick={() =>
                          handleCheckboxChange("accessList", faculty)
                        }
                        className={`px-3 py-1 border rounded ${
                          formData.accessList.includes(faculty)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {faculty}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Button Field */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={cancelPage}
                    className="border bg-white hover:bg-red-300 text-black font-semibold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={nextPage}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Next
                  </button>
                </div>
              </section>
            )}
            {/* End of page one */}
            {/* This is page two */}
            {currentPage === 1 && (
              <section className="bg-white shadow-md rounded-lg p-6 mb-8  mt-8 w-4/12">
                {/* Section 2 Form Fields */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-700 font-semibold">Staff</span>
                  <button
                    onClick={() => handleMedal(0, true)}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Add Staff
                  </button>
                </div>
                <div className="mt-6">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Department</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.staffs.map((staff) => (
                        // log staff
                        console.log(staff),
                        <tr key={staff.id} className="text-center">
                          <td className="py-2 px-4 border-b text-left">
                            <div>{staff.name}</div>
                            <div>{staff.email}</div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {staff.faculty}
                          </td>
                          <td className="py-2 px-4 border-b">{staff.type}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleRemoveStaff(staff.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Button Field */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={cancelPage}
                    className="border bg-white hover:bg-red-300 text-black font-semibold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={prevPage}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Next
                  </button>
                </div>
              </section>
            )}

            {currentPage === 2 && (
              <section className="bg-white shadow-md rounded-lg p-6 mb-8  mt-8">
                {/* Section 2 Form Fields */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-700 font-semibold">Room</span>
                  <button
                    onClick={() => handleMedal(1, true)}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Add Room
                  </button>
                </div>
                <div className="mt-6">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b"></th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Capacity</th>
                        <th className="py-2 px-4 border-b">Min Required</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.rooms.map((room, index) => (
                        <tr key={room.id} className="text-center">
                          <td className="py-2 px-4 border-b">#{index + 1}</td>
                          <td className="py-2 px-4 border-b text-left">
                            <div>{room.name}</div>
                            <div>{room.description}</div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {room.capacity}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {room.minRequire}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleRemoveRoom(room.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Button Field */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={cancelPage}
                    className="border bg-white hover:bg-red-300 text-black font-semibold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={prevPage}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Previous
                  </button>
                  <button
                    onClick={ValidateSpace}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Create Space
                  </button>
                </div>
              </section>
            )}

            {/* Create Staff Medal */}
            {showMedal[0] && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-xl mb-4">Add Staff</h2>

                  {/* Search Bar */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search staff"
                    className="border p-2 w-full mb-4"
                  />

                  {/* Staff List */}
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {filteredStaff.map((staff) => (
                      <div
                        key={staff.id}
                        className={`p-2 cursor-pointer ${
                          selectedStaff.id === staff.id
                            ? "bg-blue-200"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelectStaff(staff)}
                      >
                        <span>
                          {staff.name} - {staff.type}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Add Staff Button */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => handleMedal(0, false)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleAddStaff}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Add Staff
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Confirmation Page */}
            {currentPage == 3 && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-xl mb-4">Confirmation</h2>
                  <p className="mb-4">
                    Are you sure you want to create this space?
                  </p>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={prevPage}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        console.log("Create space");
                        handleCreateSpace();
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success Page */}
            {currentPage == 4 && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-xl mb-4">Success</h2>
                  <p className="mb-4">Space has been created successfully</p>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        router.push("/staff/spaceManagement");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Create Room Medal */}
            {showMedal[1] && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-4/12">
                  <h2 className="text-xl mb-4">Create Room</h2>
                  <div className="flex gap-12 justify-start">
                    <div className="w-1/2">
                      <label className="font-bold text-xl">Name</label>
                      <input
                        type="text"
                        id="RoomName"
                        name="name"
                        placeholder="RoomName"
                        value={currentRoom.name}
                        onChange={handleRoomChange}
                        className="border p-2 block w-full mb-4"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="font-bold text-xl">RoomNumber</label>
                      <input
                        type="text"
                        id="RoomNumber"
                        name="roomNumber"
                        placeholder="RoomNumber"
                        value={currentRoom.roomNumber}
                        onChange={handleRoomChange}
                        className="border p-2 block w-full mb-4"
                      />
                    </div>
                  </div>
                  <label htmlFor="description" className="font-bold text-xl">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4} // Sets the height of the textarea
                    maxLength={50} // Limits the input to 50 characters
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter a description (max 50 characters)"
                    onChange={handleRoomChange}
                    value={currentRoom.description}
                  />
                  <div className="flex gap-12 justify-start mt-6">
                    <div className="w-1/2">
                      <label className="font-bold text-xl">Capacity</label>
                      <input
                        type="number"
                        id="RoomCapacity"
                        name="capacity"
                        placeholder="0"
                        value={currentRoom.capacity}
                        onChange={handleRoomChange}
                        className="border p-2 block w-full mb-4"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="font-bold text-xl">Min Capacity</label>
                      <input
                        type="number"
                        id="RoomMinRequire"
                        name="minRequire"
                        placeholder="0"
                        value={currentRoom.minRequire}
                        onChange={handleRoomChange}
                        className="border p-2 block w-full mb-4"
                      />
                    </div>
                  </div>
                  {/* Create Room Button */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        handleMedal(1, false);
                        handleRoomClear();
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleAddRoom();
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

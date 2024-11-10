// change is_available room
// remove room
// edit/add room

import AddButton from "@/components/Common/Buttons/AddButton";
import Table from "@/components/Common/Table/Table";
import { GetRoomData } from "@/api/space";
import { useEffect, useMemo, useState } from "react";
import ColorButton from "@/components/Common/Buttons/ColorButton";
import ToggleButton from "@/components/Common/Buttons/ToggleButton";
import { RoomOverlayProps, RoomOverlay } from "./RoomModal";

export default function RoomTable({
  existingRooms,
}: {
  existingRooms: GetRoomData[];
}) {
  const [isAddVisible, setAddVisible] = useState(false);
  const [rooms, setRooms] = useState<GetRoomData[]>([]);
  const [editRoom, setEditRoom] = useState<GetRoomData | null>(null);

  useEffect(() => {
    setRooms(existingRooms);
  }, [existingRooms]);

  // for Edit room modal
  const RoomOverlayProps = useMemo(
    () => ({
      id: "add-modal",
      editRoom,
      onClose: () => {
        setAddVisible(false);
        setEditRoom(null);
      },
      onConfirm: (room: GetRoomData | null) => {
        if (room) {
          setRooms((prevRooms) => {
            if (editRoom) {
              // Edit case
              return prevRooms.map((r) => (r.ID === room.ID ? room : r));
            } else {
              // Add case
              return [...prevRooms, room];
            }
          });
        }
        setAddVisible(false);
        setEditRoom(null);
      },
    }),
    [editRoom]
  );

  // Edit room
  const Edit = (room: GetRoomData) => {
    setEditRoom(room);
    setAddVisible(true);
  };

  // remove room
  const Remove = (roomId: number) => {
    console.log(`Removed room with ID: ${roomId}`);
  };

  // set open-close for each room
  const onToggle = (roomId: number, checked: boolean) => {
    console.log(`Change room id: ${roomId}, checked: ${checked}`);
  };

  // room table
  const header = ["", "NAME", "CAPACITY", "MIN REQUIRED", "", "", ""];
  const rows = (rooms: GetRoomData[]) => {
    return rooms.map((data, index) => (
      <tr key={index} className="border-b border-gray-300">
        <td className="px-4 py-2 text-center font-semibold text-gray-800">
          #{index + 1}
        </td>
        <td className="px-4 py-2 text-center">
          <div className="flex flex-col space-y-2 justify-items-center items-start">
            <div className="font-semibold text-gray-800">
              {data.name} #{data.room_number}
            </div>
            <div className="font-normal text-gray-500">{data.description}</div>
          </div>
        </td>
        <td className="px-4 py-2 text-center text-gray-500">{data.capacity}</td>
        <td className="px-4 py-2 text-center text-gray-500">
          {data.min_reserve_capacity}
        </td>
        <td className="px-4 py-2 text-center text-gray-500">
          <ToggleButton
            id={data.ID}
            initialChecked={!data.is_available}
            onToggle={onToggle}
          />
        </td>
        <td className="px-6 py-2 text-end">
          <ColorButton
            color="blue-400"
            label="Edit"
            onClick={() => Edit(data)}
          />
        </td>
        <td className="px-6 py-2 text-end">
          <ColorButton
            color="red-400"
            label="Remove"
            onClick={() => Remove(data.ID)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="space-y-6">
      <RoomOverlay isVisible={isAddVisible} addProps={RoomOverlayProps} />
      <AddButton
        heading="List of Rooms"
        label="Add Room"
        onClick={() => {
          setEditRoom(null);
          setAddVisible(true);
        }}
      />
      <Table headers={header} rows={rows(rooms)} />
    </div>
  );
}

import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import { GetRoomData } from "@/api/space";

export type RoomOverlayProps = {
  id: string;
  editRoom?: GetRoomData | null;
  onClose: () => void;
  onConfirm: (room: GetRoomData | null) => void;
};

export function RoomOverlay({
  isVisible,
  addProps,
}: {
  isVisible: boolean;
  addProps: RoomOverlayProps;
}) {
  const { id, editRoom, onClose, onConfirm } = addProps;
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState<number>(0);
  const [minCapacity, setMinCapacity] = useState<number>(0);

  const [room, setRoom] = useState<GetRoomData | null>(null);

  useEffect(() => {
    if (editRoom) {
      setRoom(editRoom);
      setName(editRoom.name);
      setRoomNumber(editRoom.room_number);
      setDescription(editRoom.description);
      setCapacity(editRoom.capacity || 0);
      setMinCapacity(editRoom.min_reserve_capacity || 0);
    } else {
      setName("");
      setRoomNumber("");
      setDescription("");
      setCapacity(0);
      setMinCapacity(0);
    }
  }, [editRoom]);

  useEffect(() => {
    const $modalElement = document.querySelector(`#add-modal-${id}`);
    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-10",
        closable: true,
      };

      modal = new Modal($modalElement, modalOptions);
      modal.show();
    }

    return () => {
      if (modal) {
        modal.hide();
      }
    };
  }, [isVisible, id]);

  const onSubmit = () => {
    const editedRoom = {
      ID: room?.ID ?? 0,
      name,
      room_number: roomNumber,
      description,
      capacity,
      min_reserve_capacity: minCapacity,
      is_available: room?.is_available ?? false,
      CreatedAt: room?.CreatedAt ?? "",
      UpdatedAt: room?.UpdatedAt ?? "",
      DeletedAt: room?.DeletedAt ?? null,
    };
    onConfirm(editedRoom);
  };

  return (
    isVisible && (
      <div
        id={`add-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-blue-50 min-h-[381px] opacity-100 border border-[#DFE4EA] rounded-lg px-8 py-5 flex flex-col h-auto w-[657px] m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content space-y-12">
            <h1 className="text-left font-bold text-2xl">Edit Room</h1>
            <div className="grid grid-cols-2 gap-7">
              <div className="gap-y-2">
                <label className="text-left block font-medium text-[#111928]">
                  Name
                </label>
                <input
                  placeholder="Room Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="h-12 w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div className="gap-y-2">
                <label className="text-left block font-medium text-[#111928]">
                  Room Number
                </label>
                <input
                  placeholder="Room Number"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  type="text"
                  className="h-12 w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div className="col-span-2 flex flex-col">
                <label className="text-left">Description</label>
                <textarea
                  maxLength={50}
                  placeholder="Room Description"
                  className="min-h-[154px] w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none disabled:cursor-not-allowed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-[64px] text-left">
                <div>
                  <label className="text-left">Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="min-h-[48px] w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none disabled:cursor-not-allowed focus:ring-0 focus:outline-offset-0 focus:ring-offset-0"
                  />
                </div>
                <div>
                  <label className="text-left">Min Capacity</label>
                  <input
                    type="number"
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(Number(e.target.value))}
                    className="min-h-[48px] w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none disabled:cursor-not-allowed focus:ring-0 focus:outline-offset-0 focus:ring-offset-0"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-x-[4%]">
              <button
                className="text-white bg-blue-400 hover:bg-[#3758F9] font-medium rounded-md h-12 py-3 px-7 w-44"
                onClick={onSubmit}
              >
                Save
              </button>
              <button
                className="text-gray-400 bg-white border border-gray-400 hover:text-[#3758F9] hover:border-[#D1D5DB] font-medium rounded-md h-12 py-3 px-7 w-44"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

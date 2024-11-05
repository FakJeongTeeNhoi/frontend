import DefaultButton from "@/components/Common/Buttons/DefaultButton";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import { FormControl, Autocomplete, TextField, Paper } from "@mui/material";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import CancelButton from "@/components/Common/Buttons/CancelButton";

interface User {
  userId: number;
  name: string;
  email: string;
  faculty: string;
  type: string;
}

const mockUser = (): User[] => [
  {
    name: "AA B",
    userId: 333,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "CC B",
    userId: 444,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "DD B",
    userId: 555,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "EE B",
    userId: 666,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "FF B",
    userId: 777,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "GG B",
    userId: 888,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "HH B",
    userId: 999,
    email: "AA@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
  {
    name: "test name",
    userId: 6431316621,
    email: "naphatwaree@gmail.com",
    faculty: "Engineering",
    type: "User",
  },
];

export type AddOverlayProps = {
  id: string;
  onClose: () => void;
  onConfirm: (user: User | null) => void;
};

export function AddOverlay({
  isVisible,
  addProps,
}: {
  isVisible: boolean;
  addProps: AddOverlayProps;
}) {
  const { id, onClose, onConfirm } = addProps;
  const [focusUser, setFocusUser] = useState<User | null>(null);

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
  }, [isVisible]);

  return (
    isVisible && (
      <div
        id={`add-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-blue-50 min-h-[381px] opacity-100 border border-[#DFE4EA] rounded-lg px-8 py-5 flex flex-col h-auto w-fit m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content">
            <div className="flex flex-row items-center space-x-4">
              <div className="flex flex-row items-center">
                <SearchIcon width={40} height={40} color="#1F2937" />
                <div className="text-2xl font-semibold text-gray-800">
                  Select Participant:
                </div>
              </div>
              <FormControl
                variant="filled"
                sx={{ width: 500, backgroundColor: "white" }}
              >
                <Autocomplete
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      style={{
                        maxHeight: "229px",
                        overflowY: "auto",
                      }}
                    />
                  )}
                  options={mockUser()}
                  getOptionLabel={(option) =>
                    `${option.userId} - ${option.name}`
                  }
                  value={focusUser}
                  onChange={(event, newValue) => {
                    setFocusUser(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Participant"
                      variant="outlined"
                      placeholder="Select Participant"
                    />
                  )}
                />
              </FormControl>
            </div>
          </div>
          <div className="flex flex-row space-x-4 mt-auto place-content-end">
            <CancelButton onClick={onClose} />
            <button
              className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-md h-12 py-3 px-7 w-44"
              onClick={() => {
                onConfirm(focusUser);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  );
}

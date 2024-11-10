// get all staffs

import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import { FormControl, Autocomplete, TextField, Paper } from "@mui/material";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import CancelButton from "@/components/Common/Buttons/CancelButton";
import { StaffAccount } from "@/api/user";

const mockAllStaffs: StaffAccount[] = [
  {
    ID: 1,
    CreatedAt: "0001-01-01T00:00:00Z",
    UpdatedAt: "0001-01-01T00:00:00Z",
    DeletedAt: null,
    email: "b@gmail.com",
    password: "staff",
    name: "b",
    faculty: "Engineering",
    type: "staff",
    is_verify: true,
  },
  {
    ID: 2,
    CreatedAt: "0001-01-01T00:00:00Z",
    UpdatedAt: "0001-01-01T00:00:00Z",
    DeletedAt: null,
    email: "c@gmail.com",
    password: "staff",
    name: "c",
    faculty: "Engineering",
    type: "staff",
    is_verify: true,
  },
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

export type AddOverlayProps = {
  id: string;
  onClose: () => void;
  onConfirm: (user: StaffAccount | null) => void;
};

export function AddOverlay({
  isVisible,
  addProps,
}: {
  isVisible: boolean;
  addProps: AddOverlayProps;
}) {
  const { id, onClose, onConfirm } = addProps;
  const [focusStaff, setFocusStaff] = useState<StaffAccount | null>(null);
  const [allStaffs, setAllStaffs] = useState<StaffAccount[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //get all staffs here
        setAllStaffs(mockAllStaffs);
        console.log(allStaffs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

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
                  Select Staff:
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
                  options={allStaffs}
                  getOptionLabel={(option) => `${option.name}`}
                  value={focusStaff}
                  onChange={(event, newValue) => {
                    setFocusStaff(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Staff"
                      variant="outlined"
                      placeholder="Select Staff"
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
                onConfirm(focusStaff);
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

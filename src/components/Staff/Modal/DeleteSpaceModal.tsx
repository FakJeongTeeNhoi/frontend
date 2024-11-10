import CancelButton from "@/components/Common/Buttons/CancelButton";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import deleteModal from "@/assets/Modal/deleteModal.png";
import Image from "next/image";

export type DeleteOverlayProps = {
  id: string;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
};

export function DeleteOverlay({
  isVisible,
  deleteProps,
}: {
  isVisible: boolean;
  deleteProps: DeleteOverlayProps;
}) {
  const { id, onClose, onConfirm, name } = deleteProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#delete-modal-${id}`);
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
        id={`#delete-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-white opacity-100 border border-[#DFE4EA] rounded-lg px-8 py-5 space-y-11 w-fit m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content space-y-5">
            <Image
              src={deleteModal}
              alt="delete icon"
              className="size-[60px] mx-auto"
            />
            <h1 className="leading-8 font-semibold text-2xl">
              Delete '{name}' ?
            </h1>

            <div className="text-sm leading-6 text-[#637381]">
              Deleting the space will cancel all request and remove <br />
              every room and staff from the space
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-center mx-auto">
            <CancelButton onClick={onClose} />
            <button
              className=" bg-red-400 hover:bg-red-500 text-white font-medium rounded-md h-12 py-3 px-7 w-44"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

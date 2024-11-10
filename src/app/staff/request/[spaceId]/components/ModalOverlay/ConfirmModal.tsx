import CancelButton from "@/components/Common/Buttons/CancelButton";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";

export type ConfirmOverlayProps = {
  id: string;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  date: string;
  time: string;
};

export function ConfirmOverlay({
  isVisible,
  confirmProps,
}: {
  isVisible: boolean;
  confirmProps: ConfirmOverlayProps;
}) {
  const { id, onClose, onConfirm, name, date, time } = confirmProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#confirm-modal-${id}`);
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
        id={`#confirm-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-white opacity-100 border border-[#DFE4EA] rounded-lg px-8 py-5 space-y-11 w-fit m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content">
            <h1 className="leading-8 font-semibold text-2xl">
              Do you want to reserve <br /> '{name}' ?
            </h1>
            <div className="bg-[#2578D3] rounded-md w-[90px] h-[3px] mx-auto mt-4 mb-6" />
            <label className="text-sm leading-6 text-[#637381]">
              Co-working Space: {name} <br />
              Date: {date} Time: {time}
            </label>
          </div>
          <div className="flex flex-row space-x-4 items-center mx-auto">
            <CancelButton onClick={onClose} />
            <button
              className=" bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md h-12 py-3 px-7 w-44"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
}
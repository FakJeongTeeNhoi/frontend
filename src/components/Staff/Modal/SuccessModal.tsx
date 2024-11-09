import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";

export type SuccessOverlayProps = {
  id: string;
  onClose: () => void;
  header: string;
  text: string;
};

export function SuccessOverlay({
  isVisible,
  successProps,
}: {
  isVisible: boolean;
  successProps: SuccessOverlayProps;
}) {
  const { id, onClose, header, text } = successProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#success-modal-${id}`);
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
        id={`#success-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-white opacity-100 border border-[#DFE4EA] rounded-lg px-8 py-5 space-y-11 w-fit m-auto shadow-dropShadow z-[100] text-center">
          <div className="modal-content">
            <h1 className="font-semibold text-2xl leading-6">{header}</h1>
            <div className="bg-[#2578D3] rounded-md w-[90px] h-[3px] mx-auto mt-4 mb-6" />
            <label className="leading-6 text-[#637381]">{text}</label>
          </div>

          <button
            className=" bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md h-12 py-3 px-7 w-44 items-center mx-auto"
            onClick={onClose}
          >
            Accept
          </button>
        </div>
      </div>
    )
  );
}

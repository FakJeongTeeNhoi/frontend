import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function CancelModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-lg p-6 text-center  shadow-lg">
        <div className="flex justify-center mb-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-red-50">
            <WarningAmberOutlinedIcon className="text-red-600 w-6 h-6" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Canceled Reservation
        </h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md hover:text-gray-700 w-1/2"
          >
            Discard
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 w-1/2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Canceled Reservation Successful
        </h2>
        <hr className="w-[90px] my-3 mx-auto bg-blue-400 h-[3px] rounded-[2px] border-0" />
        <p className="text-sm text-gray-600 mb-6">
          Reservation has completely been canceled
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={() => onClose()}
            className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md hover:text-gray-700 w-1/2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

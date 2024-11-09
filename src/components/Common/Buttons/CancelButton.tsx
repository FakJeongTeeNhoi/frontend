export default function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className=" text-gray-400 bg-white border border-[#DFE4EA] hover:text-[#3758F9] hover:border-[#D1D5DB] font-semibold rounded-md h-12 py-3 px-7 w-44"
      onClick={onClick}
    >
      Cancel
    </button>
  );
}

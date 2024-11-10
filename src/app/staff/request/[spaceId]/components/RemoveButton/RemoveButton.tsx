export default function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="w-fit text-red-400 hover:text-white text-xs font-medium px-1 border border-red-400 hover:bg-red-400 text-center rounded-[50px]"
      onClick={onClick}
    >
      Remove
    </button>
  );
}

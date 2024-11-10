export default function Button({
  type,
  onClick,
}: {
  type: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-fit hover:text-white font-medium px-5 py-1 border text-center rounded-[50px] ${
        type === "approve"
          ? "text-blue-400 border-blue-400 hover:bg-blue-400"
          : "text-red-400 border-red-400 hover:bg-red-400"
      }`}
      onClick={onClick}
    >
      {type === "approve" ? "Approve" : "Cancel"}
    </button>
  );
}

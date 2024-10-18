export default function DefaultButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

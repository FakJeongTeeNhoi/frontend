import Image from "next/image";
import addIcon from "@/assets/Reservation/gg_add.png";

export default function AddButton({
  heading,
  label,
  onClick,
}: {
  heading: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="justify-between">
      <div className="flex justify-between items-center">
        <p className="text-left font-bold text-2xl">{heading}</p>

        <button
          className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white inline-flex items-center font-semibold py-2 px-6 gap-2 rounded"
          onClick={onClick}
        >
          <Image src={addIcon} alt="add" />
          {label}
        </button>
      </div>
    </div>
  );
}

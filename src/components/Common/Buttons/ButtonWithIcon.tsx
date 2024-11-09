import Image, { StaticImageData } from "next/image";
import editIcon from "@/assets/Button/editIcon.png";
import deleteIcon from "@/assets/Button/deleteIcon.png";
import viewIcon from "@/assets/Button/viewIcon.png";

interface ButtonConfig {
  label: string;
  icon: StaticImageData;
  bgColor: string;
  textColor: string;
}

const buttonConfigs: ButtonConfig[] = [
  {
    label: "Delete",
    icon: deleteIcon,
    bgColor: "bg-red-400",
    textColor: "text-white",
  },
  {
    label: "Edit",
    icon: editIcon,
    bgColor: "bg-yellow-200",
    textColor: "text-gray-800",
  },
  {
    label: "View",
    icon: viewIcon,
    bgColor: "bg-blue-400",
    textColor: "text-white",
  },
];

export default function ButtonWithIcon({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const buttonConfig = buttonConfigs.find((btn) => btn.label === label);

  if (!buttonConfig) return null;

  const { icon, bgColor, textColor } = buttonConfig;

  return (
    <button
      className={`w-[151px] h-[48px] ${bgColor} hover:bg-opacity-80 ${textColor} inline-flex items-center text-2xl font-semibold py-2 px-6 gap-2 rounded-md`}
      onClick={onClick}
    >
      <Image src={icon} alt={label} className="size-[30px]" />
      {label}
    </button>
  );
}

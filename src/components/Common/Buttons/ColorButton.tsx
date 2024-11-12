export default function ColorButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`min-w-fit w-[130px] hover:text-white font-medium px-5 py-1 border text-center rounded-[50px] 
         text-${color} border-${color} hover:bg-${color}
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

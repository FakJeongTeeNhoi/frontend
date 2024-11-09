import { useState } from "react";

export default function ToggleButton({
  id,
  initialChecked,
  onToggle,
}: {
  id: number;
  initialChecked: boolean;
  onToggle: (id: number, checked: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onToggle(id, newCheckedState);
  };

  return (
    <label className="inline-flex items-center me-5 cursor-pointer text-sm text-[#111928] font-semibold leading-6">
      <span className="me-3">Open</span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only peer w-[60px] h-[32px]"
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
      <span className="ms-3">Close</span>
    </label>
  );
}

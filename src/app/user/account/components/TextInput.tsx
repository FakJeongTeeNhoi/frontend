import React from "react";

interface TextProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  disable?: boolean;
  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  id,
  label,
  type,
  placeholder,
  disable = false,
  value,
  onChange,
}: TextProps) {
  return (
    <div className="gap-y-2">
      <label htmlFor={id} className="block font-medium text-[#111928]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="h-12 w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none disabled:cursor-not-allowed"
        placeholder={placeholder}
        disabled={disable}
        required
      />
    </div>
  );
}

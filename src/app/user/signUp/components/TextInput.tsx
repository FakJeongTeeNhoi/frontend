import React from "react";

interface TextProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change the type for onChange to accept event
}

const TextInput: React.FC<TextProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange, // Accept onChange as a prop
}) => {
  return (
    <div className="gap-y-2">
      <label
        htmlFor={id} // Use the correct id for the label
        className="block font-medium text-[#111928]"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value} // Set the value from props
        onChange={onChange} // Set the onChange handler from props
        className="h-12 w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default TextInput;

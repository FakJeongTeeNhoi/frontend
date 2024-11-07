import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

interface PasswordProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change the type for onChange to accept event
}

const PasswordInput: React.FC<PasswordProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange, // Accept onChange as a prop
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <label htmlFor={id} className="block font-medium text-[#111928] my-auto">
        {label}
      </label>
      <div className="relative">
        <input
          id={id} // Use the passed id prop here
          type={isPasswordVisible ? "text" : "password"}
          className="h-12 w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-[#6B7280] rounded-e-md focus:outline-none focus:text-[#3758F9]"
        >
          {isPasswordVisible ? (
            <VisibilityOff className="text-gray-500" />
          ) : (
            <Visibility className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;

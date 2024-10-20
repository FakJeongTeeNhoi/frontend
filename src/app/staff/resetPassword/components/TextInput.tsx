import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface TextProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isHidden?: boolean;
}

const TextInput: React.FC<TextProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  isHidden,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="gap-y-2 relative">
      <label
        htmlFor={id}
        className={`block font-medium text-[#111928] ${
          isHidden ? "hidden" : ""
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordVisible && type === "password" ? "text" : type} // Toggle between password and text types
          id={id}
          value={value}
          onChange={onChange}
          className={`h-12 w-full py-3 px-4 bg-white border border-[#DFE4EA] text-[#637381] placeholder:text-[#9CA3AF] rounded-md focus:border-[#3758F9] focus:outline-none ${
            isHidden ? "hidden" : ""
          }`}
          placeholder={placeholder}
          required={isHidden ? false : true}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-3 focus:outline-none"
          >
            {isPasswordVisible ? (
              <VisibilityOff className="text-gray-500" />
            ) : (
              <Visibility className="text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;

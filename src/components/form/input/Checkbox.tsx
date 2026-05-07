import React from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
  disabled,
  id,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative w-5 h-5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className={`w-5 h-5 appearance-none border border-black rounded-md
          checked:bg-black checked:border-black
          ${className}`}
          {...props}
        />

        {(checked || disabled) && (
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke={disabled ? "#E4E7EC" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {label && (
        <span className="text-sm text-gray-800">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
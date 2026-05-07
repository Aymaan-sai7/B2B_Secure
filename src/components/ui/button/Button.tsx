import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) => {

  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-[#12033A] text-white hover:bg-[#1b0a55] active:scale-[0.98]",
    outline:
      "bg-white ring-1 ring-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
  inline-flex items-center justify-center gap-2 rounded-lg transition
  ${sizeClasses[size]}
  ${variantClasses[variant]}
  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  disabled:opacity-50 disabled:cursor-not-allowed
  ${className}
`}
      {...props}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default Button;
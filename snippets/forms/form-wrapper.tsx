import type { FC, FormEvent, ReactNode } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ onSubmit, children, className = "" }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;

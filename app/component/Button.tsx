import { ReactNode } from "react";

interface Props {
  onClick: any;
  children: ReactNode;
  type: "submit" | "reset" | "button";
  className: String;
}

function Button({ onClick, children, type, className }: Props) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={"rounded-md hover:bg-opacity-50 " + className}
      >
        {children}
      </button>
    </>
  );
}

export default Button;

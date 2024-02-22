import { ReactNode } from "react";

interface Props {
  onClick: any;
  children: ReactNode;
  type: "submit" | "reset" | "button";
}

function Button({ onClick, children, type }: Props) {
  return (
    <>
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export default Button;

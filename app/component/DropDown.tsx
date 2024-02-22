import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  dropDownContent: String;
}

function DropDown({ children, dropDownContent }: Props) {
  const [isOpen, setOpen] = useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    const dropDownCurrent = dropDownRef.current as unknown as HTMLDivElement;
    if (dropDownCurrent && !dropDownCurrent.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  const dropDownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  });
  return (
    <div
      onClick={() => {
        setOpen(!isOpen);
      }}
      ref={dropDownRef}
      className=""
    >
      <div className="w-full flex justify-between">{children}</div>
      <div
        className={`w-full transition-all + ${isOpen ? "show" : "hide hidden"}`}
      >
        <p>{dropDownContent}</p>
      </div>
    </div>
  );
}

export default DropDown;

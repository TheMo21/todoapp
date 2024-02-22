import { ReactNode } from "react";
import Button from "./Button";

interface Props {
  children: ReactNode;
  id: string;
}

function ListItem({ children, id }: Props) {
  return <li className="list-none">{children}</li>;
}

export default ListItem;

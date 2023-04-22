import { FC, ReactNode } from "react";

interface TableBodyProps {
	children: ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
	return <tbody className="table__body">{children}</tbody>;
};

export default TableBody;

import { FC, memo } from "react";

interface TableHeaderProps {
	columnNames: string[];
}

export const TableHeader: FC<TableHeaderProps> = memo(({ columnNames }) => {
	return (
		<thead>
			<tr>
				{columnNames.map((columnName, index) => (
					<th className="table__cell" key={index}>
						{columnName}
					</th>
				))}
			</tr>
		</thead>
	);
});

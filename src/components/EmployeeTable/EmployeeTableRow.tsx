import { FC, memo, ChangeEvent } from "react";
import { Employee, EmployeeKeys } from "../../models/Employee";

interface EmployeeTableRowProps {
	employee: Employee;
	onToggle: (id: string, isSelected: boolean) => void;
	onChangeField: (fieldName: EmployeeKeys, value: string, id: string) => void;
}

export const EmployeeTableRow: FC<EmployeeTableRowProps> = memo(
	({ employee, onToggle, onChangeField }) => {
		const { id, isSelected, lastName, firstName, position } = employee;

		const rowClasses = ["table__row"];

		if (isSelected) {
			rowClasses.push("selected");
		}

		const handleToggle = () => onToggle(id, isSelected);
		const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) =>
			onChangeField("lastName", e.target.value, id);
		const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) =>
			onChangeField("firstName", e.target.value, id);
		const onChangePosition = (e: ChangeEvent<HTMLInputElement>) =>
			onChangeField("position", e.target.value, id);

		return (
			<tr className={rowClasses.join(" ")}>
				<td className="table__cell">
					<input type="checkbox" checked={isSelected} onChange={handleToggle} />
				</td>

				<td className="table__cell">
					<input type="text" onChange={onChangeLastName} value={lastName} />
				</td>
				<td className="table__cell">
					<input type="text" onChange={onChangeFirstName} value={firstName} />
				</td>
				<td className="table__cell">
					<input type="text" onChange={onChangePosition} value={position} />
				</td>
			</tr>
		);
	}
);

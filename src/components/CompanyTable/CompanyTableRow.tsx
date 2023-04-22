import { Company, CompanyKeys } from "../../models/Company";
import { ChangeEvent, memo } from "react";

interface CompanyTableRowProps {
	company: Company;
	onToggle: (id: string, isSelected: boolean) => void;
	onChangeField: (fieldName: CompanyKeys, value: string, id: string) => void;
}

export const CompanyTableRow = memo(
	({ company, onToggle, onChangeField }: CompanyTableRowProps) => {
		const { address, employees, id, isSelected, name } = company;

		const handleToggle = () => onToggle(id, isSelected);
		const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
			onChangeField("name", e.target.value, id);
		const onChangAddress = (e: ChangeEvent<HTMLInputElement>) =>
			onChangeField("address", e.target.value, id);

		const rowClasses = ["table__row"];

		if (isSelected) {
			rowClasses.push("selected");
		}

		return (
			<tr className={rowClasses.join(" ")}>
				<td className="table__cell">
					<input type="checkbox" checked={isSelected} onChange={handleToggle} />
				</td>

				<td className="table__cell">
					<input type="text" onChange={onChangeName} value={name} />
				</td>

				<td className="table__cell">{employees.length}</td>
				<td className="table__cell">
					<input type="text" onChange={onChangAddress} value={address} />
				</td>
			</tr>
		);
	}
);

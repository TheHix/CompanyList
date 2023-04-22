import { useState, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
	selectEmployeesBySelectedCompanies,
	updateEmployee,
} from "../../store/slices/employeesSlice";
import TableBody from "../Table/TableBody";
import TableContainer from "../Table/TableContainer";
import { TableHeader } from "../Table/TableHeader";
import { EmployeeTableRow } from "./EmployeeTableRow";
import {
	addSelectedEmployee,
	removeSelectedEmployee,
	selectSelectedEmployeeIds,
	toggleSelectedEmployee,
} from "../../store/slices/selectedEmployeeIdsSlice";
import { Employee, EmployeeKeys } from "../../models/Employee";
import { removeEmployeeFromCompany } from "../../store/thunks/removeEmployeeFromCompany";
import { nanoid } from "nanoid";
import { addEmployeeToCompany } from "../../store/thunks/addEmployeeToCompany";
import { selectSelectedCompanyIds } from "../../store/slices/selectedCompanyIdsSlice";

const columnNames = ["Чекбокс", "Фамилия", "Имя", "Должность"];

export const EmployeeTable = () => {
	const employeesBySelectedCompanies = useAppSelector(
		selectEmployeesBySelectedCompanies
	);
	const selectedCompanyIds = useAppSelector(selectSelectedCompanyIds);
	const selectedEmployeeIds = useAppSelector(selectSelectedEmployeeIds);

	const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const onToggle = useCallback(
		(id: string, isSelected: boolean) => {
			const employeeChanges = { id, changes: { isSelected: !isSelected } };
			dispatch(updateEmployee(employeeChanges));
			dispatch(toggleSelectedEmployee(id));

			setIsSelectedAll(false);
		},
		[dispatch]
	);

	const onToggleAll = useCallback(() => {
		employeesBySelectedCompanies.forEach(({ id }) => {
			const employeeChanges = { id, changes: { isSelected: !isSelectedAll } };
			dispatch(updateEmployee(employeeChanges));

			const action = isSelectedAll
				? removeSelectedEmployee
				: addSelectedEmployee;
			dispatch(action(id));
		});

		setIsSelectedAll((prev) => !prev);
	}, [dispatch, employeesBySelectedCompanies, isSelectedAll]);

	const onChangeField = useCallback(
		(fieldName: EmployeeKeys, value: string, id: string) => {
			const companyChanges = { id, changes: { [fieldName]: value } };
			dispatch(updateEmployee(companyChanges));
		},
		[dispatch]
	);

	const onClickRemove = useCallback(() => {
		selectedEmployeeIds.forEach((employeeId) => {
			dispatch(removeEmployeeFromCompany(employeeId));
		});

		setIsSelectedAll(false);
	}, [dispatch, selectedEmployeeIds]);

	const onClickAdd = useCallback(() => {
		if (!selectedCompanyIds.length) return;

		const id = nanoid(5);
		const newEmployee: Employee = {
			companyId: selectedCompanyIds[selectedCompanyIds.length - 1],
			id,
			firstName: `firstName ${id}`,
			lastName: `lastName ${id}`,
			isSelected: false,
			position: `position ${id}`,
		};

		dispatch(addEmployeeToCompany(newEmployee));

		setIsSelectedAll(false);
	}, [dispatch, selectedCompanyIds]);

	if (!selectedCompanyIds.length) {
		return null;
	}

	return (
		<TableContainer
			title="Сотрудники"
			onClickAdd={onClickAdd}
			onClickRemove={onClickRemove}
			onToggleAll={onToggleAll}
			checked={isSelectedAll}
		>
			<TableHeader columnNames={columnNames} />

			<TableBody>
				{employeesBySelectedCompanies.map((employee) => {
					return (
						<EmployeeTableRow
							onChangeField={onChangeField}
							key={employee.id}
							employee={employee}
							onToggle={onToggle}
						/>
					);
				})}
			</TableBody>
		</TableContainer>
	);
};

import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { nanoid } from "nanoid";

import {
	addCompany,
	selectAllCompanies,
	updateCompany,
} from "../../store/slices/companiesSlice";
import {
	addSelectedCompany,
	removeSelectedCompany,
	selectSelectedCompanyIds,
	toggleSelectedCompany,
} from "../../store/slices/selectedCompanyIdsSlice";
import { Company, CompanyKeys } from "../../models/Company";
import { CompanyTableRow } from "./CompanyTableRow";
import TableContainer from "../Table/TableContainer";
import { TableHeader } from "../Table/TableHeader";
import TableBody from "../Table/TableBody";
import { removeCompanyAndEmployees } from "../../store/thunks/removeCompanyAndEmployees";

const columnNames = [
	"Чекбокс",
	"Название компании",
	"Кол-во сотрудников",
	"Адрес",
];

export const CompanyTable = () => {
	const dispatch = useAppDispatch();
	const companies = useAppSelector(selectAllCompanies);
	const selectedCompanyIds = useAppSelector(selectSelectedCompanyIds);

	const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);

	const onToggleAll = useCallback(() => {
		companies.forEach(({ id }) => {
			const companyChanges = { id, changes: { isSelected: !isSelectedAll } };
			dispatch(updateCompany(companyChanges));

			const action = isSelectedAll ? removeSelectedCompany : addSelectedCompany;
			dispatch(action(id));
		});

		setIsSelectedAll((prev) => !prev);
	}, [companies, dispatch, isSelectedAll]);

	const onToggle = useCallback(
		(id: string, isSelected: boolean) => {
			const companyChanges = { id, changes: { isSelected: !isSelected } };

			dispatch(toggleSelectedCompany(id));
			dispatch(updateCompany(companyChanges));

			setIsSelectedAll(false);
		},
		[dispatch]
	);

	const onChangeField = useCallback(
		(fieldName: CompanyKeys, value: string, id: string) => {
			const companyChanges = { id, changes: { [fieldName]: value } };
			dispatch(updateCompany(companyChanges));
		},
		[dispatch]
	);

	const onClickAdd = useCallback(() => {
		const id = nanoid(5);
		const newCompany: Company = {
			id,
			address: `some address ${id}`,
			employees: [],
			isSelected: false,
			name: `Company ${id}`,
		};

		dispatch(addCompany(newCompany));

		setIsSelectedAll(false);
	}, [dispatch]);

	const onClickRemove = useCallback(() => {
		selectedCompanyIds.forEach((selectedCompanyId) => {
			dispatch(removeCompanyAndEmployees(selectedCompanyId));
		});

		setIsSelectedAll(false);
	}, [dispatch, selectedCompanyIds]);

	return (
		<TableContainer
			title="Компании"
			onClickAdd={onClickAdd}
			onClickRemove={onClickRemove}
			onToggleAll={onToggleAll}
			checked={isSelectedAll}
		>
			<TableHeader columnNames={columnNames} />

			<TableBody>
				{companies.map((company) => {
					return (
						<CompanyTableRow
							key={company.id}
							company={company}
							onChangeField={onChangeField}
							onToggle={onToggle}
						/>
					);
				})}
			</TableBody>
		</TableContainer>
	);
};

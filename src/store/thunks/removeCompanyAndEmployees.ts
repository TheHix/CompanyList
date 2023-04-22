import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeCompany } from "../slices/companiesSlice";
import {
	removeManyEmployees,
	selectEmployeesBySelectedCompanies,
} from "../slices/employeesSlice";
import { removeSelectedCompany } from "../slices/selectedCompanyIdsSlice";
import { StateSchema } from "../store";
import { removeManySelectedEmployees } from "../slices/selectedEmployeeIdsSlice";

export const removeCompanyAndEmployees = createAsyncThunk(
	"removeCompanyAndEmployees",
	(companyId: string, { dispatch, getState }) => {
		const state = getState() as StateSchema;

		const employees = selectEmployeesBySelectedCompanies(state);
		const employeesIds = employees.map((employee) => employee.id);

		dispatch(removeManyEmployees(employeesIds));
		dispatch(removeManySelectedEmployees(employeesIds));

		dispatch(removeCompany(companyId));
		dispatch(removeSelectedCompany(companyId));
	}
);

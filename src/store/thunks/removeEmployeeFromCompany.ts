import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectCompanyById, updateCompany } from "../slices/companiesSlice";
import { removeEmployee, selectEmployeeById } from "../slices/employeesSlice";
import { StateSchema } from "../store";
import { removeSelectedEmployee } from "../slices/selectedEmployeeIdsSlice";

export const removeEmployeeFromCompany = createAsyncThunk(
	"removeEmployeeFromCompany",
	async (employeeId: string, { dispatch, getState }) => {
		const state = getState() as StateSchema;

		const employee = selectEmployeeById(state, employeeId);
		if (!employee) return;

		const company = selectCompanyById(state, employee.companyId);
		if (!company) return;

		const employees = company.employees.filter((e) => e !== employeeId);

		dispatch(
			updateCompany({
				id: employee.companyId,
				changes: { employees },
			})
		);

		dispatch(removeEmployee(employeeId));
		dispatch(removeSelectedEmployee(employeeId));
	}
);

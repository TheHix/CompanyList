import { createAsyncThunk } from "@reduxjs/toolkit";

import { StateSchema } from "../store";
import { Employee } from "../../models/Employee";
import { selectCompanyById, updateCompany } from "../slices/companiesSlice";
import { addEmployee } from "../slices/employeesSlice";

export const addEmployeeToCompany = createAsyncThunk(
	"addEmployeeToCompany",
	(employee: Employee, { dispatch, getState }) => {
		const state = getState() as StateSchema;

		const company = selectCompanyById(state, employee.companyId);
		if (!company) return;

		const employees = [...company.employees, employee.id];

		dispatch(addEmployee(employee));
		dispatch(updateCompany({ id: employee.companyId, changes: { employees } }));
	}
);

import { createSelector } from "reselect";
import {
	createSlice,
	createEntityAdapter,
	EntityState,
} from "@reduxjs/toolkit";
import { Employee } from "../../models/Employee";
import { selectSelectedCompanyIds } from "./selectedCompanyIdsSlice";

const employeeAdapter = createEntityAdapter<Employee>({
	selectId: (employee) => employee.id,
});

export interface EmployeesState extends EntityState<Employee> {}

const employeesInitialState = employeeAdapter.getInitialState<EmployeesState>({
	ids: ["101", "102", "103", "104", "105", "106"],
	entities: {
		101: { id: "101", companyId: "1", name: "Employee 1" },
		102: { id: "102", companyId: "1", name: "Employee 2" },
		103: { id: "103", companyId: "1", name: "Employee 3" },
		104: { id: "104", companyId: "2", name: "Employee 4" },
		105: { id: "105", companyId: "2", name: "Employee 5" },
		106: { id: "106", companyId: "3", name: "Employee 6" },
	},
});

export const employeesSlice = createSlice({
	name: "employees",

	initialState: employeesInitialState,

	reducers: {
		addCompany: employeeAdapter.addOne,
		removeCompany: employeeAdapter.removeOne,
		updateCompanyName: employeeAdapter.updateOne,
	},
});

export const { selectAll: selectAllEmployees } = employeeAdapter.getSelectors(
	(state: { employees: EmployeesState }) => state.employees
);

export const { reducer: employeesReducer } = employeesSlice;

export const selectEmployeesBySelectedCompanies = createSelector(
	[selectAllEmployees, selectSelectedCompanyIds],
	(persons, selectedCompanies) => {
		if (selectedCompanies.length === 0) {
			return persons;
		}

		return persons.filter((person) =>
			selectedCompanies.includes(person.companyId)
		);
	}
);

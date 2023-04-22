import {
	createSlice,
	createEntityAdapter,
	EntityState,
	createSelector,
} from "@reduxjs/toolkit";
import { Employee } from "../../models/Employee";
import { selectSelectedCompanyIds } from "./selectedCompanyIdsSlice";

export const employeeAdapter = createEntityAdapter<Employee>({
	selectId: (employee) => employee.id,
});

export interface EmployeesState extends EntityState<Employee> {}

const employeesInitialState = employeeAdapter.getInitialState<EmployeesState>({
	ids: ["101", "102", "103", "104", "105", "106"],
	entities: {
		101: {
			id: "101",
			companyId: "1",
			firstName: "firstName 1",
			lastName: "lastName 1",
			position: "position 1",
			isSelected: false,
		},
		102: {
			id: "102",
			companyId: "1",
			firstName: "firstName 2",
			lastName: "lastName 2",
			position: "position 2",
			isSelected: false,
		},
		103: {
			id: "103",
			companyId: "1",
			firstName: "firstName 3",
			lastName: "lastName 3",
			position: "position 4",
			isSelected: false,
		},
		104: {
			id: "104",
			companyId: "2",
			firstName: "firstName 4",
			lastName: "lastName 4",
			position: "position 3",
			isSelected: false,
		},
		105: {
			id: "105",
			companyId: "2",
			firstName: "firstName 5",
			lastName: "lastName 5",
			position: "position 3",
			isSelected: false,
		},
		106: {
			id: "106",
			companyId: "3",
			firstName: "firstName 6",
			lastName: "lastName 6",
			position: "position 4",
			isSelected: false,
		},
	},
});

export const employeesSlice = createSlice({
	name: "employees",

	initialState: employeesInitialState,

	reducers: {
		addEmployee: employeeAdapter.addOne,
		removeEmployee: employeeAdapter.removeOne,
		removeManyEmployees: employeeAdapter.removeMany,
		updateEmployee: employeeAdapter.updateOne,
	},
});

export const { selectAll: selectAllEmployees, selectById: selectEmployeeById } =
	employeeAdapter.getSelectors(
		(state: { employees: EmployeesState }) => state.employees
	);

export const {
	removeEmployee,
	removeManyEmployees,
	addEmployee,
	updateEmployee,
} = employeesSlice.actions;

export const { reducer: employeesReducer } = employeesSlice;

export const selectEmployeesBySelectedCompanies = createSelector(
	[selectAllEmployees, selectSelectedCompanyIds],
	(employees, selectedCompanies) => {
		if (!selectedCompanies.length) {
			return [];
		}

		return employees.filter((employees) =>
			selectedCompanies.includes(employees.companyId)
		);
	}
);

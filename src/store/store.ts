import { EmployeesState, employeesReducer } from "./slices/employeesSlice";
import { configureStore } from "@reduxjs/toolkit";
import { CompaniesState, companiesReducer } from "./slices/companiesSlice";
import { selectedEmployeeIdsReducer } from "./slices/selectedEmployeeIdsSlice";
import { selectedCompanyIdsReducer } from "./slices/selectedCompanyIdsSlice";

export interface StateSchema {
	companies: CompaniesState;
	employees: EmployeesState;
	selectedEmployeeIds: string[];
	selectedCompanyIds: string[];
}

export const store = configureStore<StateSchema>({
	reducer: {
		companies: companiesReducer,
		employees: employeesReducer,
		selectedEmployeeIds: selectedEmployeeIdsReducer,
		selectedCompanyIds: selectedCompanyIdsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { EmployeesState, employeesReducer } from "./slices/employeesSlice";
import { configureStore } from "@reduxjs/toolkit";
import { CompaniesState, companiesReducer } from "./slices/companiesSlice";
import { selectedCompanyIdsReducer } from "./slices/selectedCompanyIdsSlice";

export interface StateSchema {
	companies: CompaniesState;
	selectedCompanyIds: string[];
	employees: EmployeesState;
}

export const store = configureStore<StateSchema>({
	reducer: {
		companies: companiesReducer,
		selectedCompanyIds: selectedCompanyIdsReducer,
		employees: employeesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "../store";

const initialState: string[] = [];

const selectedEmployeeIdsSlice = createSlice({
	name: "selectedEmployeeIds",

	initialState,

	reducers: {
		addSelectedEmployee(state, action: PayloadAction<string>) {
			const companyId = action.payload;

			if (!state.includes(companyId)) {
				state.push(companyId);
			}
		},
		removeSelectedEmployee(state, action: PayloadAction<string>) {
			const employeeId = action.payload;
			const index = state.indexOf(employeeId);
			const hasEmployeeId = index !== -1;

			if (hasEmployeeId) {
				state.splice(index, 1);
			}
		},

		toggleSelectedEmployee(state, action: PayloadAction<string>) {
			const employeeId = action.payload;
			const index = state.indexOf(employeeId);
			const hasEmployeeId = index !== -1;

			if (hasEmployeeId) {
				state.splice(index, 1);
			} else {
				state.push(employeeId);
			}
		},
		removeManySelectedEmployees(state, action: PayloadAction<string[]>) {
			state = state.filter((selectedEmployee) =>
				action.payload.includes(selectedEmployee)
			);
		}
	},
});

export const selectSelectedEmployeeIds = (state: StateSchema) =>
	state.selectedEmployeeIds;

export const {
	removeManySelectedEmployees,
	toggleSelectedEmployee,
	addSelectedEmployee,
	removeSelectedEmployee,
} = selectedEmployeeIdsSlice.actions;

export const { reducer: selectedEmployeeIdsReducer } = selectedEmployeeIdsSlice;

import { createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "../store";

const initialState: string[] = [];

const selectedCompanyIdsSlice = createSlice({
	name: "selectedCompanyIds",

	initialState,

	reducers: {
		addSelectedCompany(state, action) {
			const companyId = action.payload;

			if (!state.includes(companyId)) {
				state.push(companyId);
			}
		},
		removeSelectedCompany(state, action) {
			const companyId = action.payload;
			const index = state.indexOf(companyId);
			const hasCompanyId = index !== -1;

			if (!hasCompanyId) {
				state.splice(index, 1);
			}
		},
		clearSelectedCompanies(state) {
			state.length = 0;
		},
	},
});

export const selectSelectedCompanyIds = (state: StateSchema) =>
	state.selectedCompanyIds;

export const {
	addSelectedCompany,
	clearSelectedCompanies,
	removeSelectedCompany,
} = selectedCompanyIdsSlice.actions;

export const { reducer: selectedCompanyIdsReducer } = selectedCompanyIdsSlice;

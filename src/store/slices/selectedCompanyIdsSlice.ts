import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "../store";

const initialState: string[] = ["1"];

const selectedCompanyIdsSlice = createSlice({
	name: "selectedCompanyIds",

	initialState,

	reducers: {
		addSelectedCompany(state, action: PayloadAction<string>) {
			const companyId = action.payload;

			if (!state.includes(companyId)) {
				state.push(companyId);
			}
		},
		removeSelectedCompany(state, action: PayloadAction<string>) {
			const companyId = action.payload;
			const index = state.indexOf(companyId);
			const hasCompanyId = index !== -1;

			if (hasCompanyId) {
				state.splice(index, 1);
			}
		},
		toggleSelectedCompany(state, action: PayloadAction<string>) {
			const companyId = action.payload;
			const index = state.indexOf(companyId);
			const hasCompanyId = index !== -1;

			if (hasCompanyId) {
				state.splice(index, 1);
			} else {
				state.push(companyId);
			}
		},
	},
});

export const selectSelectedCompanyIds = (state: StateSchema) =>
	state.selectedCompanyIds;

export const {
	addSelectedCompany,
	removeSelectedCompany,
	toggleSelectedCompany,
} = selectedCompanyIdsSlice.actions;

export const { reducer: selectedCompanyIdsReducer } = selectedCompanyIdsSlice;

import {
	createSlice,
	createEntityAdapter,
	EntityState,
} from "@reduxjs/toolkit";
import { Company } from "../../models/Company";

const companyAdapter = createEntityAdapter<Company>({
	selectId: (company) => company.id,
});
export interface CompaniesState extends EntityState<Company> {}

const companiesInitialState = companyAdapter.getInitialState<CompaniesState>({
	ids: ["1", "2", "3"],
	entities: {
		1: { id: "1", employees: ["101", "102", "103"], name: "Company 1" },
		2: { id: "2", employees: ["104", "105"], name: "Company 2" },
		3: { id: "3", employees: ["106"], name: "Company 2" },
	},
});

export const companiesSlice = createSlice({
	name: "companies",

	initialState: companiesInitialState,

	reducers: {
		addCompany: companyAdapter.addOne,
		removeCompany: companyAdapter.removeOne,
		updateCompanyName: companyAdapter.updateOne,
	},
});

export const { reducer: companiesReducer } = companiesSlice;

export const { selectAll: selectAllCompanies } = companyAdapter.getSelectors(
	(state: { companies: CompaniesState }) => state.companies
);

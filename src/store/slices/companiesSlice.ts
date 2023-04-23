import {
	createSlice,
	createEntityAdapter,
	EntityState,
} from "@reduxjs/toolkit";
import { Company } from "../../models/Company";

export const companyAdapter = createEntityAdapter<Company>({
	selectId: (company) => company.id,
});
export interface CompaniesState extends EntityState<Company> {}

const companiesInitialState = companyAdapter.getInitialState<CompaniesState>({
	ids: ["1", "2", "3", "4", "5", "6", "7", "8"],
	entities: {
		1: {
			id: "1",
			employees: ["101", "102", "103"],
			name: "Company 1",
			address: "some address 1",
			isSelected: true,
		},
		2: {
			id: "2",
			employees: ["104", "105"],
			name: "Company 2",
			address: "some address 2",
			isSelected: false,
		},
		3: {
			id: "3",
			employees: ["106"],
			name: "Company 2",
			address: "some address 3",
			isSelected: false,
		},
		4: {
			id: "4",
			employees: [],
			name: "Company 4",
			address: "some address 4",
			isSelected: false,
		},
		5: {
			id: "5",
			employees: [],
			name: "Company 5",
			address: "some address 5",
			isSelected: false,
		},
		6: {
			id: "6",
			employees: [],
			name: "Company 6",
			address: "some address 6",
			isSelected: false,
		},
		7: {
			id: "7",
			employees: [],
			name: "Company 7",
			address: "some address 7",
			isSelected: false,
		},
		8: {
			id: "8",
			employees: [],
			name: "Company 8",
			address: "some address 8",
			isSelected: false,
		},
	},
});

export const companiesSlice = createSlice({
	name: "companies",

	initialState: companiesInitialState,

	reducers: {
		addCompany: companyAdapter.addOne,
		removeCompany: companyAdapter.removeOne,
		updateCompany: companyAdapter.updateOne,
	},
});

export const { reducer: companiesReducer } = companiesSlice;

export const { addCompany, removeCompany, updateCompany } =
	companiesSlice.actions;

export const { selectAll: selectAllCompanies, selectById: selectCompanyById } =
	companyAdapter.getSelectors(
		(state: { companies: CompaniesState }) => state.companies
	);

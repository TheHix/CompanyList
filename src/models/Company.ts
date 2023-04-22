export interface Company {
	id: string;
	name: string;
	address: string;
	employees: string[];
	isSelected: boolean;
}
export type CompanyKeys = keyof Company;

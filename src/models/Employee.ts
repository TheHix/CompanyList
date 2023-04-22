export interface Employee {
	id: string;
	lastName: string;
	firstName: string;
	position: string;
	companyId: string;
	isSelected: boolean;
}
export type EmployeeKeys = keyof Employee;

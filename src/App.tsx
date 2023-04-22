import { CompanyTable } from "./components/CompanyTable/CompanyTable";
import { EmployeeTable } from "./components/EmployeeTable/EmployeeTable";

const App = () => {
	return (
		<div className="app">
			<CompanyTable />
			<EmployeeTable />
		</div>
	);
};
export default App;

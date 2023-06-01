import { Employee } from "../../services/employee.ts";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard.tsx";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
    const employeesQuery = useQuery({
        queryKey: ["employees"],
        queryFn: Employee.getAll,
    });
    const navigate = useNavigate();

    const handleClick = (e: any) => {
        e.stopPropagation();
        navigate(`/Employee`);
    };
    if (employeesQuery.isLoading) return <h1>Loading...</h1>;
    if (employeesQuery.isError) return <h1>Error loading data!</h1>;
    return (
        <div>
            <h1>Employees</h1>
            <div>
                <p>
                    Please click on Edit to find more details of each employee
                </p>
                <button onClick={handleClick}>Add employee</button>
            </div>
            {employeesQuery.data?.map((emp: any) => {
                return <EmployeeCard key={emp.id} employee={emp} />;
            })}
        </div>
    );
};

export default EmployeeList;

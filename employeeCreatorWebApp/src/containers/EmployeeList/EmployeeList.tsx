import { useEffect, useState } from "react";
import { Employee } from "../../services/employee.ts";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard.tsx";

const EmployeeList = () => {
    const [employees, setEmployees] = useState<any>([]);

    useEffect(() => {
        const wrapper = async () => {
            const allEmps = await Employee.getAll();
            setEmployees(allEmps);
        };
        wrapper();
    }, []);
    return (
        <div>
            <h1>Employees</h1>
            <div>
                <p>
                    Please click on Edit to find more details of each employee
                </p>
                <button>Add employee</button>
            </div>
            {employees &&
                employees.map((emp: any) => {
                    return (
                        <EmployeeCard
                            key={emp.id}
                            firstName={emp.firstName}
                            lastName={emp.lastName}
                            contractTime={emp.contractTime}
                            email={emp.email}
                            id={emp.id}
                        />
                    );
                })}
        </div>
    );
};

export default EmployeeList;

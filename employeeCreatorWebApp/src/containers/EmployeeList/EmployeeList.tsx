import { Employee } from "../../services/employee.ts";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard.tsx";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Header } from "../../StyledComponents/Header/Header.ts";
import { HeaderBackground } from "../../StyledComponents/HeaderBackground/HeaderBackground.ts";
import { PageHolder } from "../../StyledComponents/PageHolder/PageHolder.ts";
import { Button } from "../../StyledComponents/Button/Button.ts";
import { CardContainer } from "../../StyledComponents/CardContainer/CardContainer.ts";
import { ListContainer } from "../../StyledComponents/ListContainer/ListContainerts.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { fillAll } from "../../app/employeesSlice.ts";
import { useEffect } from "react";

export const queryWrapper = () => {
    const query = useQuery({
        queryKey: ["employees"],
        queryFn: Employee.getAll,
    });
    const response = query.data;
    return response;
};

const EmployeeList = () => {
    const dispatch = useAppDispatch();
    const employeesQueryData = queryWrapper();
    const navigate = useNavigate();
    const handleClick = (e: any) => {
        e.stopPropagation();
        navigate(`/Employee`);
    };

    useEffect(() => {
        if (employeesQueryData !== undefined) {
            dispatch(fillAll(employeesQueryData));
        }
    }, [employeesQueryData]);
    return (
        <PageHolder>
            <HeaderBackground>
                <Header>Employees' list</Header>
            </HeaderBackground>
            <ListContainer>
                <CardContainer>
                    <p>
                        Please click on Edit to find more details of each
                        employee
                    </p>
                    <Button $primary onClick={handleClick}>
                        Add employee
                    </Button>
                </CardContainer>
                {employeesQueryData?.map((emp: any) => {
                    return <EmployeeCard key={emp.id} employee={emp} />;
                })}
            </ListContainer>
        </PageHolder>
    );
};

export default EmployeeList;

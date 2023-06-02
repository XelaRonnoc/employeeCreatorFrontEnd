import { Employee } from "../../services/employee.ts";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard.tsx";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Header } from "../../StyledComponents/Header/Header.ts";
import { HeaderBackground } from "../../StyledComponents/HeaderBackground/HeaderBackground.ts";
import styled, { css } from "styled-components";
import { PageHolder } from "../../StyledComponents/PageHolder/PageHolder.ts";
import { Button } from "../../StyledComponents/Button/Button.ts";
import { CardContainer } from "../../StyledComponents/CardContainer/CardContainer.ts";

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

    const ListContainer = styled.div<{ $primary?: boolean }>`
        width: 80%;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        ${(props) => props.$primary && css``}
    `;

    if (employeesQuery.isLoading) return <h1>Loading...</h1>;
    if (employeesQuery.isError) return <h1>Error loading data!</h1>;
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
                {employeesQuery.data?.map((emp: any) => {
                    return <EmployeeCard key={emp.id} employee={emp} />;
                })}
            </ListContainer>
        </PageHolder>
    );
};

export default EmployeeList;

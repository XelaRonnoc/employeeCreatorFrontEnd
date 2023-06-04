import { useMutation, useQueryClient } from "react-query";
import { Employee } from "../../services/employee";
import { useNavigate } from "react-router-dom";
import { CardContainer } from "../../StyledComponents/CardContainer/CardContainer";
import {
    MiniButton,
    MiniButtonHolder,
} from "../../StyledComponents/MiniButton/MiniButton";
import { IconSpan } from "../../StyledComponents/IconSpan/IconSpan";
import { calculateDateDiff } from "../../services/helperFunctions";

const EmployeeCard = ({ employee }: any) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(Employee.deleteById, {
        onSuccess: () => {
            const message = "success";
            alert(message);
        },
        onError: () => {
            alert("there was an error");
        },
        onSettled: () => {
            queryClient.invalidateQueries("delete");
        },
    });

    const handleClickRemove = async () => {
        mutate(employee.id);
    };

    const handleClickEdit = async () => {
        navigate(`/Employee/${employee.id}`);
    };

    const contractLength = employee.contract.endDate
        ? calculateDateDiff(
              new Date(employee.contract.startDate),
              new Date(employee.contract.endDate)
          )
        : "Ongoing";

    const displayContractType =
        employee.contract.contractType.substring(0, 1).toUpperCase() +
        employee.contract.contractType.substring(
            1,
            employee.contract.contractType.length
        );

    return (
        <CardContainer>
            <div>
                <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
                <p>{`${displayContractType} - ${contractLength} ${
                    typeof contractLength === "number"
                        ? contractLength > 1
                            ? "years"
                            : "year"
                        : ""
                }`}</p>
                <p>{`Email: ${employee.email}`}</p>
            </div>

            <MiniButtonHolder>
                <MiniButton onClick={handleClickEdit}>Edit</MiniButton>
                <IconSpan>|</IconSpan>
                <MiniButton onClick={handleClickRemove}>Remove</MiniButton>
            </MiniButtonHolder>
        </CardContainer>
    );
};

export default EmployeeCard;

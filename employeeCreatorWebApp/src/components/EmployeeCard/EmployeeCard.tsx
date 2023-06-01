import { useMutation, useQueryClient } from "react-query";
import { Employee } from "../../services/employee";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee }: any) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(Employee.deleteById, {
        onSuccess: (data) => {
            console.log(data);
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
        navigate(`/editEmployee/${employee.id}`);
    };
    return (
        <div>
            <div>
                <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
                <p>{`Contract: ${employee.contractTime}`}</p>
                <p>{`Email: ${employee.email}`}</p>
            </div>

            <div>
                <button onClick={handleClickEdit}>Edit</button>
                <button onClick={handleClickRemove}>Remove</button>
            </div>
        </div>
    );
};

export default EmployeeCard;

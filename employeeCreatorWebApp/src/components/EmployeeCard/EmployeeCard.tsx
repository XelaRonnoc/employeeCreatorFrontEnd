import { useMutation, useQueryClient } from "react-query";
import { Employee } from "../../services/employee";

const EmployeeCard = ({
    firstName,
    lastName,
    contractTime,
    email,
    id,
}: any) => {
    const queryClient = useQueryClient();
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

    const handleClick = async () => {
        mutate(id);
    };
    return (
        <div>
            <div>
                <h3>{`${firstName} ${lastName}`}</h3>
                <p>{`Contract: ${contractTime}`}</p>
                <p>{`Email: ${email}`}</p>
            </div>

            <div>
                <button>Edit</button>
                <button onClick={handleClick}>Remove</button>
            </div>
        </div>
    );
};

export default EmployeeCard;

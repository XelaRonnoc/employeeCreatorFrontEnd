const EmployeeCard = ({
    firstName,
    LastName,
    contractTime,
    email,
    id,
}: any) => {
    return (
        <div>
            <div>
                <h3>{`${firstName} ${LastName}`}</h3>
                <p>{`Contract: ${contractTime}`}</p>
                <p>{`Email: ${email}`}</p>
            </div>

            <div>
                <button>Edit</button>
                <button>Remove</button>
            </div>
        </div>
    );
};

export default EmployeeCard;

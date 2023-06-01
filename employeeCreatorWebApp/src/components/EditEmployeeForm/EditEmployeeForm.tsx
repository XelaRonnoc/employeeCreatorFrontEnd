import { NavLink, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Employee } from "../../services/employee";
import { useMutation, useQuery, useQueryClient } from "react-query";

// enum ContractTypeEnum {
//     permanent = "permanent",
//     contract = "contract",
//     casual = "casual",
// }

// enum ContractTimeEnum {
//     fullTime = "full-time",
//     partTime = "part-time",
// }

export interface EmployeePayload {
    firstName: String;
    middleName: String;
    lastName: String;
    email: String;
    mobileNum: String;
    dateOfBirth: Date;
    address: String;
    startDate: Date;
    endDate: Date;
    contractType: String;
    contractTime: String;
    contractedHours: Number;
}

const EditEmployeeForm = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm<EmployeePayload>();
    const queryClient = useQueryClient();
    const employeeQuery = useQuery({
        queryKey: ["employee"],
        queryFn: async () => {
            if (!id) {
                console.log("id not found in URL");
                return;
            }
            const response = await Employee.getById(id);
            return response;
        },
    });
    // const { mutate } = useMutation(Employee.patchById, {
    //     onSuccess: (data) => {
    //         console.log(data);
    //         const message = "success";
    //         alert(message);
    //     },
    //     onError: () => {
    //         alert("there was an error");
    //     },
    //     onSettled: () => {
    //         queryClient.invalidateQueries("update");
    //     },
    // });

    const mutation = useMutation({
        mutationFn: (data: any) => {
            console.log(data);
            const { id, ...rest } = data;
            return Employee.patchById(id, rest);
        },
    });

    // const onSubmit: SubmitHandler<EmployeePayload> = async (data: any) => {
    //     const { contractType, contractTime, ...rest } = data;
    //     const empPackage = {
    //         contractType: contractType[0],
    //         contractTime: contractTime[0],
    //         id,
    //         ...rest,
    //     };
    //     const employee = { ...empPackage };
    //     if (id) {
    //         mutation.mutate({ employee });
    //     }
    // };

    const onSubmit: SubmitHandler<EmployeePayload> = async (data: any) => {
        const { contractType, contractTime, ...rest } = data;
        const empPackage = {
            contractType: contractType[0],
            contractTime: contractTime[0],
            id,
            ...rest,
        };
        const employee = { ...empPackage };
        const objArr = Object.entries(employee);
        const payload = objArr.reduce((acc: any, item: any) => {
            if (!acc) {
                acc = {};
            }

            if (item[1]) {
                Object.assign(acc, {
                    [item[0]]: item[1],
                });
                return acc;
            }
            return acc;
        }, {});
        if (id) {
            mutation.mutate({ ...payload });
        }
    };

    if (employeeQuery.isLoading) return <h1>Loading...</h1>;
    if (employeeQuery.isError) return <h1>Error loading data!</h1>;
    const currentEmployee = employeeQuery.data.data;
    return (
        <div>
            <NavLink to="/">{`< Back`}</NavLink>
            <h1>Employee Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>Personal information</h2>
                    <label>First name</label>
                    <input
                        // value={currentEmployee?.firstName}
                        {...register("firstName")}
                    />
                    <label>Middle name</label>
                    <input
                        // value={currentEmployee?.middleName}
                        {...register("middleName")}
                    />
                    <label>Last name</label>
                    <input
                        // value={currentEmployee?.lastName}
                        {...register("lastName")}
                    />
                    <label>Date of birth</label>
                    <input
                        // value={currentEmployee?.dateOfBirth}
                        type="date"
                        {...register("dateOfBirth")}
                    />
                </div>

                <div>
                    <h2>Contact details</h2>
                    <label>Email adress</label>
                    <input
                        type="email"
                        // value={currentEmployee?.email}
                        {...register("email")}
                    />
                    <label>Mobile number</label>
                    <small>Must be an Australian number</small>
                    <input
                        type="tel"
                        pattern="04[0-9]{8}"
                        // value={currentEmployee?.mobileNum}
                        {...register("mobileNum")}
                    />
                    <label>Residential address</label>
                    <input
                        // value={currentEmployee?.address}
                        {...register("address")}
                    />
                </div>

                <div>
                    <h2>EmployeeStatus</h2>
                    <label>Contract Type</label>
                    <select
                        multiple
                        // value={currentEmployee?.contractType}
                        {...register("contractType")}
                    >
                        <option value="permanent">Permanent</option>
                        <option value="contract">Contract</option>
                        <option value="casual">Casual</option>
                    </select>

                    <label>Start date</label>
                    <input
                        type="date"
                        // value={currentEmployee?.startDate}
                        {...register("startDate")}
                    />
                    <label>End date</label>
                    <input
                        type="date"
                        // value={currentEmployee?.endDate}
                        {...register("endDate")}
                    />
                    <label>Full-time or part-time?</label>
                    <select
                        multiple
                        // value={currentEmployee?.contractTime}
                        {...register("contractTime")}
                    >
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">Part-time</option>
                    </select>
                    <label>Hours per week</label>
                    <input
                        type="number"
                        // value={currentEmployee?.contractedHours}
                        {...register("contractedHours")}
                    />
                </div>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
};

export default EditEmployeeForm;

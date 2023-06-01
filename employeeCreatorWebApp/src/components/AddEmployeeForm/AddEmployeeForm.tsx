import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Employee } from "../../services/employee";
import { useMutation, useQueryClient } from "react-query";

// enum ContractTypeEnum {
//     permanent = "permanent",
//     contract = "contract",
//     casual = "casual",
// }

// enum ContractTimeEnum {
//     fullTime = "full-time",
//     partTime = "part-time",
// }

export interface EmployeePlainDetails {
    firstName: String;
    middleName: String;
    lastName: String;
    email: String;
    mobileNum: String;
    dateOfBirth: Date;
    streetName: String;
    streetNumber: String;
    suburb: String;
    state: String;
    postCode: String;
    startDate: Date;
    endDate: Date;
    contractType: String;
    contractTime: String;
    contractedHours: Number;
}

export interface EmployeePayload {
    firstName: String;
    middleName: String;
    lastName: String;
    email: String;
    mobileNum: String;
    dateOfBirth: Date;
    address: {
        streetName: String;
        streetNumber: String;
        suburb: String;
        state: String;
        postCode: String;
    };
    contract: {
        startDate: Date;
        endDate: Date;
        contractType: String;
        contractTime: String;
        contractedHours: Number;
    };
}

const AddEmployeeForm = () => {
    const { register, handleSubmit } = useForm<EmployeePlainDetails>();
    const queryClient = useQueryClient();
    const { mutate } = useMutation(Employee.addEmployee, {
        onSuccess: (data) => {
            console.log(data);
            const message = "success";
            alert(message);
        },
        onError: () => {
            alert("there was an error");
        },
        onSettled: () => {
            queryClient.invalidateQueries("create");
        },
    });

    // const onSubmit: SubmitHandler<EmployeePayload> = async (data) => {
    //     console.log(data);
    //     const response = await Employee.addEmployee(data);
    //     console.log(response);
    // };

    const onSubmit: SubmitHandler<EmployeePlainDetails> = async (
        data: EmployeePlainDetails
    ) => {
        const {
            contractType,
            contractTime,
            streetName,
            streetNumber,
            suburb,
            postCode,
            state,
            startDate,
            endDate,
            contractedHours,
            ...rest
        } = data;
        const empPackage = {
            address: {
                streetName,
                streetNumber,
                suburb,
                postCode,
                state,
            },
            contract: {
                contractType: contractType[0],
                contractTime: contractTime[0],
                startDate,
                endDate,
                contractedHours,
            },
            ...rest,
        };
        const employee: EmployeePayload = { ...empPackage };
        console.log(employee);
        mutate(employee);
    };

    return (
        <div>
            <NavLink to="/">{`< Back`}</NavLink>
            <h1>Employee Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>Personal information</h2>
                    <label>First name</label>
                    <input {...register("firstName", { required: true })} />
                    <label>Middle name</label>
                    <input {...register("middleName")} />
                    <label>Last name</label>
                    <input {...register("lastName", { required: true })} />
                    <label>Date of birth</label>
                    <input
                        type="date"
                        {...register("dateOfBirth", { required: true })}
                    />
                </div>

                <div>
                    <h2>Contact details</h2>
                    <label>Email adress</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <label>Mobile number</label>
                    <small>Must be an Australian number</small>
                    <input
                        type="tel"
                        pattern="04[0-9]{8}"
                        {...register("mobileNum", { required: true })}
                    />
                    {/* <label>Residential address</label>
                    <input {...register("address", { required: true })} /> */}

                    <label>Street Number</label>
                    <input {...register("streetNumber", { required: true })} />
                    <label>Street Name</label>
                    <input {...register("streetName", { required: true })} />
                    <label>Suburb</label>
                    <input {...register("suburb", { required: true })} />
                    <label>State</label>
                    <input {...register("state", { required: true })} />
                    <label>Post Code</label>
                    <input {...register("postCode", { required: true })} />
                </div>

                <div>
                    <h2>EmployeeStatus</h2>
                    <label>Contract Type</label>
                    <select
                        multiple
                        {...register("contractType", { required: true })}
                    >
                        <option value="permanent">Permanent</option>
                        <option value="contract">Contract</option>
                        <option value="casual">Casual</option>
                    </select>

                    <label>Start date</label>
                    <input
                        type="date"
                        {...register("startDate", { required: true })}
                    />
                    <label>End date</label>
                    <input type="date" {...register("endDate")} />
                    <label>Full-time or part-time?</label>
                    <select
                        multiple
                        {...register("contractTime", { required: true })}
                    >
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">Part-time</option>
                    </select>
                    <label>Hours per week</label>
                    <input
                        type="number"
                        {...register("contractedHours", { required: true })}
                    />
                </div>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
};

export default AddEmployeeForm;

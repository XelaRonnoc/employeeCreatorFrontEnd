import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

enum ContractTypeEnum {
    permanent = "permanent",
    contract = "contract",
    casual = "casual",
}

enum ContractTimeEnum {
    fullTime = "full-time",
    partTime = "part-time",
}

interface IFormInput {
    firstName: String;
    middleName: String;
    lastName: String;
    email: String;
    mobileNum: String;
    dateOfBirth: Date;
    address: String;
    startDate: Date;
    endDate: Date;
    contractType: ContractTypeEnum;
    contractTime: ContractTimeEnum;
    contractedHours: Number;
}

const AddEmployeeForm = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
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
                    <label>Residential address</label>
                    <input {...register("address", { required: true })} />
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

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Employee } from "../../services/employee";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { Button } from "../../StyledComponents/Button/Button.ts";
import { PageHolder } from "../../StyledComponents/PageHolder/PageHolder.ts";
import {
    StyledInput,
    StyledForm,
    SubSection,
    StyledLabel,
    Small,
} from "../../StyledComponents/StyledForm/StyledForm.ts";
import { Header } from "../../StyledComponents/Header/Header.ts";
import { HeaderBackground } from "../../StyledComponents/HeaderBackground/HeaderBackground.ts";

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

const EmployeeForm = () => {
    const navigate = useNavigate();
    const employeeQuery = useQuery({
        queryKey: ["employee"],
        queryFn: async () => {
            if (!id) {
                console.log("No id In URL");
                return {};
            }
            const response = await Employee.getById(id);
            const { address, contract, ...rest } = response.data;
            const result = { ...address, ...contract, ...rest };
            result.startDate = result.startDate.substring(0, 10);
            result.endDate = result.endDate.substring(0, 10);
            result.dateOfBirth = result.dateOfBirth.substring(0, 10);
            return result;
        },
    });

    const { register, handleSubmit, reset } = useForm<EmployeePlainDetails>({
        defaultValues: {},
    });

    useEffect(() => {
        if (id) {
            reset(employeeQuery.data);
        } else {
            reset();
        }
    }, [employeeQuery.data]);

    const queryClient = useQueryClient();
    const { id } = useParams();
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

    const mutation = useMutation({
        mutationFn: (data: any) => {
            console.log(data);
            const { id, ...rest } = data;
            return Employee.putById(id, rest);
        },
        onSuccess: () => {
            alert("success");
        },
    });

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
                contractType:
                    typeof contractType === "string"
                        ? contractType
                        : contractType[0],
                contractTime:
                    typeof contractTime === "string"
                        ? contractTime
                        : contractTime[0],
                startDate,
                endDate,
                contractedHours,
            },
            ...rest,
        };
        const employee: EmployeePayload = { ...empPackage };
        if (id) {
            console.log("updating");
            mutation.mutate({ ...employee });
        } else {
            console.log("creating");
            mutate(employee);
        }
    };

    const handleClick = () => {
        reset();
        navigate(`/`);
    };

    return (
        <PageHolder>
            <HeaderBackground>
                <NavLink to="/">{`< Back`}</NavLink>
                <Header>Employee Details</Header>
            </HeaderBackground>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <SubSection>
                    <h2>Personal information</h2>
                    <StyledLabel>First name</StyledLabel>
                    <StyledInput
                        {...register("firstName", { required: true })}
                    />
                    <StyledLabel>Middle name</StyledLabel>
                    <StyledInput {...register("middleName")} />
                    <StyledLabel>Last name</StyledLabel>
                    <StyledInput
                        {...register("lastName", { required: true })}
                    />
                    <StyledLabel>Date of birth</StyledLabel>
                    <StyledInput
                        type="date"
                        {...register("dateOfBirth", { required: true })}
                    />
                </SubSection>

                <SubSection>
                    <h2>Contact details</h2>
                    <StyledLabel>Email adress</StyledLabel>
                    <StyledInput
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <StyledLabel>Mobile number</StyledLabel>
                    <Small>Must be an Australian number</Small>
                    <StyledInput
                        type="tel"
                        pattern="04[0-9]{8}"
                        {...register("mobileNum", { required: true })}
                    />

                    <StyledLabel>Street Number</StyledLabel>
                    <StyledInput
                        {...register("streetNumber", { required: true })}
                    />
                    <StyledLabel>Street Name</StyledLabel>
                    <StyledInput
                        {...register("streetName", { required: true })}
                    />
                    <StyledLabel>Suburb</StyledLabel>
                    <StyledInput {...register("suburb", { required: true })} />
                    <StyledLabel>State</StyledLabel>
                    <StyledInput {...register("state", { required: true })} />
                    <StyledLabel>Post Code</StyledLabel>
                    <StyledInput
                        {...register("postCode", { required: true })}
                    />
                </SubSection>

                <SubSection>
                    <h2>EmployeeStatus</h2>
                    <StyledLabel>Contract Type</StyledLabel>
                    <select
                        multiple
                        {...register("contractType", { required: true })}
                    >
                        <option value="permanent">Permanent</option>
                        <option value="contract">Contract</option>
                        <option value="casual">Casual</option>
                    </select>

                    <StyledLabel>Start date</StyledLabel>
                    <StyledInput
                        type="date"
                        {...register("startDate", { required: true })}
                    />
                    <StyledLabel>End date</StyledLabel>
                    <StyledInput type="date" {...register("endDate")} />
                    <StyledLabel>Full-time or part-time?</StyledLabel>
                    <select {...register("contractTime", { required: true })}>
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">Part-time</option>
                    </select>
                    <StyledLabel>Hours per week</StyledLabel>
                    <StyledInput
                        type="number"
                        {...register("contractedHours", { required: true })}
                    />
                </SubSection>
                <Button $primary type="submit">
                    Save
                </Button>
                <Button onClick={handleClick}>Cancel</Button>
            </StyledForm>
        </PageHolder>
    );
};

export default EmployeeForm;

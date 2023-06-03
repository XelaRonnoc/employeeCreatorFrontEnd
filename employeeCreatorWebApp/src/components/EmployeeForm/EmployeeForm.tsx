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
    StyledRadio,
    RadioHolder,
    RadioLabel,
} from "../../StyledComponents/StyledForm/StyledForm.ts";
import { Header } from "../../StyledComponents/Header/Header.ts";
import { HeaderBackground } from "../../StyledComponents/HeaderBackground/HeaderBackground.ts";
import {
    MiniButton,
    MiniButtonHolder,
} from "../../StyledComponents/MiniButton/MiniButton.ts";
import { IconSpan } from "../../StyledComponents/IconSpan/IconSpan.ts";

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
                <MiniButtonHolder>
                    <IconSpan $primary>{`<`}</IconSpan>
                    <MiniButton onClick={handleClick}>{` Back`}</MiniButton>
                </MiniButtonHolder>
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
                    <RadioHolder>
                        <StyledRadio
                            type="radio"
                            value="permanent"
                            id="permanentContract"
                            {...register("contractType", { required: true })}
                        ></StyledRadio>
                        <RadioLabel htmlFor="permanentContract">
                            Permanant
                        </RadioLabel>
                    </RadioHolder>
                    <RadioHolder>
                        <StyledRadio
                            type="radio"
                            value="contract"
                            id="contractContract"
                            {...register("contractType", { required: true })}
                        ></StyledRadio>
                        <RadioLabel htmlFor="contractContract">
                            Contract
                        </RadioLabel>
                    </RadioHolder>
                    <RadioHolder>
                        <StyledRadio
                            type="radio"
                            value="casual"
                            id="casualContract"
                            {...register("contractType", { required: true })}
                        ></StyledRadio>
                        <RadioLabel htmlFor="casualContract">Casual</RadioLabel>
                    </RadioHolder>

                    <StyledLabel>Start date</StyledLabel>
                    <StyledInput
                        type="date"
                        {...register("startDate", { required: true })}
                    />
                    <StyledLabel>End date</StyledLabel>
                    <StyledInput type="date" {...register("endDate")} />
                    <StyledLabel>Full-time or part-time?</StyledLabel>
                    <RadioHolder>
                        <StyledRadio
                            type="radio"
                            value="fullTime"
                            id="fullTimeContract"
                            {...register("contractTime", { required: true })}
                        ></StyledRadio>
                        <RadioLabel htmlFor="fullTimeContract">
                            Full-time
                        </RadioLabel>
                    </RadioHolder>
                    <RadioHolder>
                        <StyledRadio
                            type="radio"
                            value="partTime"
                            id="partTimeContract"
                            {...register("contractTime", { required: true })}
                        ></StyledRadio>
                        <RadioLabel htmlFor="partTimeContract">
                            Part-time
                        </RadioLabel>
                    </RadioHolder>
                    <StyledLabel>Hours per week</StyledLabel>
                    <StyledInput
                        type="number"
                        {...register("contractedHours", { required: true })}
                    />
                </SubSection>
                <div>
                    <Button $primary type="submit">
                        Save
                    </Button>
                    <Button onClick={handleClick}>Cancel</Button>
                </div>
            </StyledForm>
        </PageHolder>
    );
};

export default EmployeeForm;

import { useNavigate, useParams } from "react-router-dom";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FullInput, { FullRadio } from "../FullInput/FullInput.tsx";

const phoneRegexp = /04[0-9]{8}/;
const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobileNum: Yup.string()
        .matches(phoneRegexp, "Phone number must be an australian number")
        .required("Mobile Number is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    streetName: Yup.string().required("Street name is required"),
    streetNumber: Yup.string().required("Street number is required"),
    suburb: Yup.string().required("Suburb is required"),
    state: Yup.string().required("State/territory is required"),
    postCode: Yup.string().required("Post code is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().optional(),
    contractType: Yup.string().required("Contract Type is required"),
    contractTime: Yup.string().required("Contract Time is required"),
    contractedHours: Yup.number()
        .integer()
        .min(1, "minimum 1 hour per week")
        .max(40, "maximum 40 hours per week")
        .required("Number of hours per week is required"),
});

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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            mobileNum: "",
            dateOfBirth: new Date(),
            streetName: "",
            streetNumber: "",
            suburb: "",
            state: "",
            postCode: "",
            startDate: new Date(),
            endDate: new Date(),
            contractType: "",
            contractTime: "",
            contractedHours: 1,
        },
        mode: "all",
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
        onSuccess: () => {
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
            mutation.mutate({ ...employee });
        } else {
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
                    <FullInput
                        error={errors.firstName}
                        {...register("firstName")}
                    />
                    <StyledLabel>Middle name</StyledLabel>
                    <FullInput
                        error={errors.middleName}
                        {...register("middleName")}
                    />
                    <StyledLabel>Last name</StyledLabel>
                    <FullInput
                        error={errors.lastName}
                        {...register("lastName")}
                    />
                    <StyledLabel>Date of birth</StyledLabel>
                    <FullInput
                        error={errors.dateOfBirth}
                        type="date"
                        {...register("dateOfBirth")}
                    />
                </SubSection>

                <SubSection>
                    <h2>Contact details</h2>
                    <StyledLabel>Email adress</StyledLabel>
                    <FullInput
                        error={errors.email}
                        type="email"
                        {...register("email")}
                    />
                    <StyledLabel>Mobile number</StyledLabel>
                    <Small>Must be an Australian number</Small>
                    <FullInput
                        error={errors.mobileNum}
                        // type="tel"
                        // pattern="04[0-9]{8}"
                        {...register("mobileNum")}
                    />

                    <StyledLabel>Street Number</StyledLabel>
                    <FullInput
                        error={errors.streetNumber}
                        {...register("streetNumber")}
                    />
                    <StyledLabel>Street Name</StyledLabel>
                    <FullInput
                        error={errors.streetName}
                        {...register("streetName")}
                    />
                    <StyledLabel>Suburb</StyledLabel>
                    <FullInput error={errors.suburb} {...register("suburb")} />
                    <StyledLabel>State</StyledLabel>
                    <FullInput error={errors.state} {...register("state")} />
                    <StyledLabel>Post Code</StyledLabel>
                    <FullInput
                        error={errors.postCode}
                        {...register("postCode")}
                    />
                </SubSection>

                <SubSection>
                    <h2>EmployeeStatus</h2>
                    <StyledLabel>Contract Type</StyledLabel>
                    <RadioHolder>
                        <FullRadio
                            type="radio"
                            value="permanent"
                            id="permanentContract"
                            error={errors.contractType}
                            {...register("contractType")}
                        ></FullRadio>
                        <RadioLabel htmlFor="permanentContract">
                            Permanant
                        </RadioLabel>
                    </RadioHolder>
                    <RadioHolder>
                        <FullRadio
                            type="radio"
                            value="contract"
                            id="contractContract"
                            error={errors.contractType}
                            {...register("contractType")}
                        ></FullRadio>
                        <RadioLabel htmlFor="contractContract">
                            Contract
                        </RadioLabel>
                    </RadioHolder>
                    <RadioHolder>
                        <FullRadio
                            type="radio"
                            value="casual"
                            id="casualContract"
                            error={errors.contractType}
                            {...register("contractType")}
                        ></FullRadio>
                        <RadioLabel htmlFor="casualContract">Casual</RadioLabel>
                    </RadioHolder>

                    <StyledLabel>Start date</StyledLabel>
                    <FullInput
                        error={errors.startDate}
                        type="date"
                        {...register("startDate")}
                    />
                    <StyledLabel>End date</StyledLabel>
                    <FullInput
                        error={errors.endDate}
                        type="date"
                        {...register("endDate")}
                    />
                    <StyledLabel>Full-time or part-time?</StyledLabel>
                    <RadioHolder>
                        <FullRadio
                            type="radio"
                            value="fullTime"
                            id="fullTimeContract"
                            error={errors.contractTime}
                            {...register("contractTime")}
                        ></FullRadio>
                        <RadioLabel htmlFor="fullTimeContract">
                            Full-time
                        </RadioLabel>
                    </RadioHolder>
                    <RadioHolder>
                        <FullRadio
                            type="radio"
                            value="partTime"
                            id="partTimeContract"
                            error={errors.contractTime}
                            {...register("contractTime")}
                        ></FullRadio>
                        <RadioLabel htmlFor="partTimeContract">
                            Part-time
                        </RadioLabel>
                    </RadioHolder>
                    <StyledLabel>Hours per week</StyledLabel>
                    <FullInput
                        error={errors.contractedHours}
                        type="number"
                        min={1}
                        max={40}
                        {...register("contractedHours")}
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

import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Employee } from "../../services/employee";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { Button } from "../../StyledComponents/Button/Button.ts";
import { PageHolder } from "../../StyledComponents/PageHolder/PageHolder.ts";
import {
    StyledForm,
    SubSection,
    StyledLabel,
    Small,
    RadioHolder,
    RadioLabel,
    CheckBoxHolder,
    CheckBoxLabel,
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
import FullInput, { FullCheckBox, FullRadio } from "../FullInput/FullInput.tsx";
import { useAppSelector } from "../../app/hooks.ts";

Yup.addMethod(Yup.date, "stripEmptyString", function () {
    return this.transform((value) => (value === "" ? undefined : value));
});

const phoneRegexp = /04[0-9]{8}/;
const registerSchema = Yup.object().shape({
    ongoing: Yup.string().optional(),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobileNum: Yup.string()
        .matches(phoneRegexp, "Phone number must be an australian number")
        .required("Mobile Number is required"),
    dateOfBirth: Yup.date()
        .typeError("Date of Birth is required")
        .defined("Date of Birth is required")
        .nonNullable()
        .required("Date of Birth is required"),
    streetName: Yup.string().required("Street name is required"),
    streetNumber: Yup.string().required("Street number is required"),
    suburb: Yup.string().required("Suburb is required"),
    state: Yup.string().required("State/territory is required"),
    postCode: Yup.string().required("Post code is required"),
    startDate: Yup.date()
        .typeError("Start Date is required")
        .defined("Start Date is required")
        .nonNullable()
        .required("Start date is required"),
    endDate: Yup.date().when("ongoing", (value) => {
        if (!value[0] || value[0] === "false") {
            return Yup.date().required().typeError("Must Not be Empty");
        } else {
            return Yup.date()
                .nullable()
                .transform(() => null)
                .optional()
                .typeError("");
        }
    }),
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
        endDate: Date | null;
        contractType: String;
        contractTime: String;
        contractedHours: Number;
    };
}

const EmployeeForm = () => {
    const navigate = useNavigate();
    const allEmployees = useAppSelector((state) => state.employeeHolder.value);
    const [ongoing, setOngoing] = useState(false);
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
            ongoing: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const findFromStore = (allEmployees: Array<any>, id: number) => {
        const thisEmployee = allEmployees.find((emp) => emp.id === id);
        return thisEmployee;
    };

    useEffect(() => {
        const wrapper = async () => {
            if (id) {
                let curEmployee = findFromStore(allEmployees, parseInt(id));
                if (!curEmployee) {
                    const response = await Employee.getById(id);
                    curEmployee = response.data;
                }
                if (curEmployee) {
                    const { address, contract, ...rest } = curEmployee;
                    const destEmp = { ...address, ...contract, ...rest };

                    destEmp.startDate = destEmp.startDate.substring(0, 10);

                    destEmp.endDate
                        ? (destEmp.endDate = destEmp.endDate.substring(0, 10))
                        : setOngoing(true);
                    destEmp.dateOfBirth = destEmp.dateOfBirth.substring(0, 10);
                    destEmp.ongoing = destEmp.endDate ? "" : "ongoing"; // checks ongoing box on if no date
                    reset({ ...destEmp });
                } else {
                    navigate("/employee");
                }
            } else {
                reset();
            }
        };
        wrapper();
    }, []);

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
            dateOfBirth,
            ...rest
        } = data;

        const empPackage = {
            dateOfBirth: new Date(
                `${dateOfBirth.getFullYear()}-${
                    dateOfBirth.getMonth() + 1
                }-${dateOfBirth.getDate()}`
            ),
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
                startDate: new Date(
                    `${startDate.getFullYear()}-${
                        startDate.getMonth() + 1
                    }-${startDate.getDate()}`
                ),
                endDate:
                    endDate === null
                        ? null
                        : new Date(
                              `${endDate.getFullYear()}-${
                                  endDate.getMonth() + 1
                              }-${endDate.getDate()}`
                          ),
                contractedHours,
            },
            ...rest,
        };

        const employee: EmployeePayload = { ...empPackage };
        if (id) {
            await mutation.mutate({ ...employee });
        } else {
            await mutate(employee);
        }
        reset();
        navigate("/");
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
                        disabled={ongoing ? true : false}
                    />
                    <CheckBoxHolder>
                        <FullCheckBox
                            type="checkbox"
                            onClick={() =>
                                ongoing ? setOngoing(false) : setOngoing(true)
                            }
                            {...register("ongoing")}
                            error={errors.ongoing}
                            value={"ongoing"}
                        />
                        <CheckBoxLabel>Ongoing?</CheckBoxLabel>
                    </CheckBoxHolder>
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

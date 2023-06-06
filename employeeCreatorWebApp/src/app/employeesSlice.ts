import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface EmployeeDBResponse {
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

interface EmployeeState {
    value: Array<EmployeeDBResponse>;
}

const initialState: EmployeeState = {
    value: [
        {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            mobileNum: "",
            dateOfBirth: new Date(),
            address: {
                streetName: "",
                streetNumber: "",
                suburb: "",
                state: "",
                postCode: "",
            },
            contract: {
                startDate: new Date(),
                endDate: new Date(),
                contractType: "",
                contractTime: "",
                contractedHours: 1,
            },
        },
    ],
};

export const employeeSlice = createSlice({
    name: "employeeHolder",
    initialState,
    reducers: {
        fillAll: (state, action: PayloadAction<Array<EmployeeDBResponse>>) => {
            state.value = action.payload;
        },
        topUp: (state, action: PayloadAction<EmployeeDBResponse>) => {
            state.value.push(action.payload);
        },
    },
});

export const { fillAll, topUp } = employeeSlice.actions;
export const selectEmployees = (state: RootState) => state.employeeHolder.value;
export default employeeSlice.reducer;

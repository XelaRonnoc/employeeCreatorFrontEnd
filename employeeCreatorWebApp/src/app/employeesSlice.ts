import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeePayload } from "../components/EmployeeForm/EmployeeForm";
import { RootState } from "./store";

interface EmployeeState {
    value: Array<EmployeePayload>;
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
        fillAll: (state, action: PayloadAction<Array<EmployeePayload>>) => {
            state.value = action.payload;
        },
        topUp: (state, action: PayloadAction<EmployeePayload>) => {
            state.value.push(action.payload);
        },
    },
});

export const { fillAll, topUp } = employeeSlice.actions;
export const selectEmployees = (state: RootState) => state.employeeHolder.value;
export default employeeSlice.reducer;

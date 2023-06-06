import { MemoryRouter } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Employee } from "../../services/employee";
import userEvent from "@testing-library/user-event";
import TestContainer from "../../tests/TestContainer";
import { useAppSelector } from "../../app/hooks";

const renderEmployeeForm = () => {
    const queryClient = new QueryClient();
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <EmployeeForm />
                </QueryClientProvider>
            </MemoryRouter>
        </Provider>
    );
};

const renderEmployeeFormWithId = (someID: Number) => {
    const queryClient = new QueryClient();
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/Employee/${someID}`]}>
                <QueryClientProvider client={queryClient}>
                    <TestContainer />
                </QueryClientProvider>
            </MemoryRouter>
        </Provider>
    );
};

const mockData = [
    {
        dateOfBirth: "2023-06-13",
        email: "alex@gmail.com",
        firstName: "Boromir",
        id: 1,
        lastName: "Gray",
        middleName: "Connor",
        mobileNum: "0437811465",
        address: {
            id: 1,
            postCode: "2071",
            state: "NSW",
            streetName: "Will Street",
            streetNumber: "15",
            suburb: "Lindfield",
        },
        contract: {
            contractTime: "partTime",
            contractType: "permanent",
            contractedHours: 20,
            endDate: "2023-07-09",
            id: 1,
            startDate: "2023-06-27",
        },
    },
    {
        dateOfBirth: "2023-06-13",
        email: "alex@gmail.com",
        firstName: "Frodo",
        id: 2,
        lastName: "Smith",
        middleName: "Took",
        mobileNum: "0437811465",
        address: {
            id: 2,
            postCode: "2072",
            state: "NSW",
            streetName: "Babel Street",
            streetNumber: "15",
            suburb: "Gordon",
        },
        contract: {
            contractTime: "fullTime",
            contractType: "contract",
            contractedHours: 40,
            endDate: "2023-07-09",
            id: 2,
            startDate: "2023-06-27",
        },
    },
];

vi.mock("../../services/employee");
vi.mock("../../app/hooks");
const mockedUseAppSelector = useAppSelector as jest.Mock<any>;
const mockedAddEmployee = Employee.addEmployee as jest.Mock<Promise<any[]>>;
const mockedPutEmployee = Employee.putById as jest.Mock<Promise<any>>;

describe("Employee form tests", () => {
    test("checks that the API calls will only be done once all required fields are completed and cancel clears all fields on Add Employee", async () => {
        mockedAddEmployee.mockImplementation(async () => {
            return new Array();
        });

        const rendered = renderEmployeeForm();

        expect(mockedAddEmployee).not.toHaveBeenCalled();

        const user = userEvent.setup();
        let saveButton = rendered.getByText("Save");
        expect(saveButton).toBeDefined();
        await user.click(saveButton);
        expect(mockedAddEmployee).not.toHaveBeenCalled();

        const inputFirstName = rendered.container.querySelector(
            `input[name="firstName"]`
        ) as HTMLInputElement;
        const inputMiddleName = rendered.container.querySelector(
            `input[name="middleName"]`
        ) as HTMLInputElement;
        const inputLastName = rendered.container.querySelector(
            `input[name="lastName"]`
        ) as HTMLInputElement;
        const inputDOB = rendered.container.querySelector(
            `input[name="dateOfBirth"]`
        ) as HTMLInputElement;
        const inputEmail = rendered.container.querySelector(
            `input[name="email"]`
        ) as HTMLInputElement;
        const inputMobileNum = rendered.container.querySelector(
            `input[name="mobileNum"]`
        ) as HTMLInputElement;
        const inputStreetNumber = rendered.container.querySelector(
            `input[name="streetNumber"]`
        ) as HTMLInputElement;
        const inputStreetName = rendered.container.querySelector(
            `input[name="streetName"]`
        ) as HTMLInputElement;
        const inputSuburb = rendered.container.querySelector(
            `input[name="suburb"]`
        ) as HTMLInputElement;
        const inputState = rendered.container.querySelector(
            `input[name="state"]`
        ) as HTMLInputElement;
        const inputPostCode = rendered.container.querySelector(
            `input[name="postCode"]`
        ) as HTMLInputElement;
        const selectContractType = rendered.getByLabelText(
            "Contract"
        ) as HTMLInputElement;

        const inputStartDate = rendered.container.querySelector(
            `input[name="startDate"]`
        ) as HTMLInputElement;

        const inputOngoing = rendered.container.querySelector(
            `input[name="ongoing"]`
        ) as HTMLInputElement;

        const selectContractTime = rendered.container.querySelector(
            `input[name="fullTimeContract"]`
        ) as HTMLInputElement;

        const inputContractedHours = rendered.getByLabelText(
            "Full-time"
        ) as HTMLElement;
        await user.type(inputFirstName, "Test");
        await user.type(inputMiddleName, "Middle");
        await user.type(inputLastName, "Tested");
        await user.type(inputEmail, "email@gmail.com");
        await user.type(inputMobileNum, "0413654877");
        await user.type(inputDOB, "2000-02-01");
        await user.type(inputPostCode, "2051");
        await user.type(inputState, "NSW");
        await user.type(inputStreetName, "Billab Ave");
        await user.type(inputStreetNumber, "21");
        await user.type(inputSuburb, "Chatswood");
        await user.type(inputStartDate, "2023-06-01");
        await user.click(inputOngoing);
        await user.type(inputContractedHours, "10");
        await user.click(selectContractTime);
        await user.click(selectContractType);

        saveButton = rendered.getByText("Save");
        expect(saveButton).toBeDefined();
        await user.click(saveButton);

        await waitFor(() => {
            expect(mockedAddEmployee).toHaveBeenCalled();
        });

        let newInputFirstName = rendered.container.querySelector(
            `input[name="firstName"]`
        ) as HTMLInputElement;
        expect(newInputFirstName.value).toBe("Test");

        const cancelButton = rendered.getByText("Cancel");
        await user.click(cancelButton);

        newInputFirstName = rendered.container.querySelector(
            `input[name="firstName"]`
        ) as HTMLInputElement;
        expect(newInputFirstName.value).toBe("");
    });

    test("checks that the API calls will only be done once all required fields are completed and cancel clears all fields on edit Employee", async () => {
        mockedPutEmployee.mockImplementation(async () => {
            return null;
        });
        mockedUseAppSelector.mockImplementation(() => {
            return mockData;
        });
        const rendered = renderEmployeeFormWithId(1);
        let inputFirstName = rendered.container.querySelector(
            `input[name="firstName"]`
        ) as HTMLInputElement;
        expect(inputFirstName.value).toBe("Boromir");

        const user = userEvent.setup();
        const saveButton = rendered.getByText("Save");
        await user.click(saveButton);
        expect(mockedPutEmployee).toBeCalled();
        // const cancelButton = rendered.getByText("Cancel");
        // await user.click(cancelButton);

        inputFirstName = rendered.container.querySelector(
            `input[name="firstName"]`
        ) as HTMLInputElement;
        expect(inputFirstName).toBeNull();

        const header = rendered.getByText("Employees' list");
        expect(header).toBeDefined();
    });
});

import { beforeEach, describe, expect, test, vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, waitFor } from "@testing-library/react";
import EmployeeList from "./EmployeeList";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Employee } from "../../services/employee";
import userEvent from "@testing-library/user-event";

const renderEmployeeList = () => {
    const queryClient = new QueryClient();
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <EmployeeList />
                </QueryClientProvider>
            </MemoryRouter>
        </Provider>
    );
};

const mockData = [
    {
        dateOfBirth: "2023-06-13T00:00:00.000+00:00",
        email: "alex@gmail.com",
        firstName: "Bilbo",
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
            endDate: "2023-07-09T00:00:00.000+00:00",
            id: 1,
            startDate: "2023-06-27T00:00:00.000+00:00",
        },
    },
    {
        dateOfBirth: "2023-06-13T00:00:00.000+00:00",
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
            endDate: "2023-07-09T00:00:00.000+00:00",
            id: 2,
            startDate: "2023-06-27T00:00:00.000+00:00",
        },
    },
];

vi.mock("../../services/employee");

const mockedGetAll = Employee.getAll as jest.Mock<Promise<any[]>>;
const mockedDelete = Employee.deleteById as jest.Mock<Promise<any>>;
describe("Employee List test", () => {
    beforeEach(() => {
        mockedGetAll.mockResolvedValue(mockData);
    });

    test("displays list page and list of employees", async () => {
        const rendered = renderEmployeeList();

        const header = rendered.getByText("Employees' list");
        const button = rendered.getByText("Add employee");
        expect(button).toBeDefined();
        expect(header).toBeDefined();

        await waitFor(() => {
            const newUser = rendered.getByText("Bilbo Gray");
            expect(newUser).toBeDefined();
        });
    });

    test("on remove clicked delete function is called", async () => {
        mockedDelete.mockImplementation(async () => {
            return null;
        });
        const rendered = renderEmployeeList();

        const buttons = await waitFor(() => {
            return rendered.getAllByText("Remove");
        });

        expect(buttons).toBeDefined();
        const user = userEvent.setup();
        await user.click(buttons[1]);

        expect(mockedDelete).toHaveBeenCalledWith(2);
    });

    test("navigates to another page on click of Add employee button", async () => {
        const rendered = renderEmployeeList();
        const button = rendered.getByText("Add employee");
        expect(button).toBeDefined();
        const user = userEvent.setup();
        await user.click(button);
    });
});

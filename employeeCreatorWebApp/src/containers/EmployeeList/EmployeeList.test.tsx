import {
    Vitest,
    afterEach,
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, waitFor } from "@testing-library/react";
import * as empList from "./EmployeeList";
import EmployeeList, { queryWrapper } from "./EmployeeList";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Employee } from "../../services/employee";

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
            contractedHours: 40,
            endDate: "2023-07-09T00:00:00.000+00:00",
            id: 1,
            startDate: "2023-06-27T00:00:00.000+00:00",
        },
    },
];

vi.mock("../../services/employee");

const mockedGetAll = Employee.getAll as jest.Mock<Promise<any[]>>;
describe("Employee List test", () => {
    let spy: any;
    beforeEach(() => {
        spy = vi.spyOn(empList, "queryWrapper").mockImplementation(
            vi.fn().mockReturnValue({
                data: mockData,
            })
        );
        console.log(spy, "this is the spy");
    });

    test("displays list page and list of employees", async () => {
        mockedGetAll.mockResolvedValue(mockData);
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
});

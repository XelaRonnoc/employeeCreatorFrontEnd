import EmployeeList from "../containers/EmployeeList/EmployeeList";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import TestContainer from "./TestContainer";

vi.mock("../containers/EmployeeList/EmployeeList");
vi.mock("../components/EmployeeForm/EmployeeForm");

const mockedEmployeeList = EmployeeList as jest.Mock<any>;
const mockedEmployeeForm = EmployeeForm as jest.Mock<any>;

const renderEmployeeList = () => {
    return render(
        <MemoryRouter>
            <TestContainer />
        </MemoryRouter>
    );
};

const renderEmployeeForm = () => {
    return render(
        <MemoryRouter initialEntries={["/Employee"]}>
            <TestContainer />
        </MemoryRouter>
    );
};

const renderEmployeeFormWithId = () => {
    return render(
        <MemoryRouter initialEntries={["/Employee/1"]}>
            <TestContainer />
        </MemoryRouter>
    );
};
describe("Testing routes", () => {
    test("should render EmployeeList on default route", () => {
        mockedEmployeeList.mockImplementation(() => (
            <div>EmployeeListMock</div>
        ));

        const rendered = renderEmployeeList();
        expect(rendered.getByText("EmployeeListMock")).toBeInTheDocument();
    });

    test("should render EmployeeForm on /Employee route", () => {
        mockedEmployeeForm.mockImplementation(() => (
            <div>EmployeeFormMock</div>
        ));

        const rendered = renderEmployeeForm();

        expect(rendered.getByText("EmployeeFormMock")).toBeInTheDocument();
    });

    test("should render EmployeeForm on /Employee route", () => {
        mockedEmployeeForm.mockImplementation(() => (
            <div>EmployeeFormMockID</div>
        ));

        const rendered = renderEmployeeFormWithId();

        expect(rendered.getByText("EmployeeFormMockID")).toBeInTheDocument();
    });
});

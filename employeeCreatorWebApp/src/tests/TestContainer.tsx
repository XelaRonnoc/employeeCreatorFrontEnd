import { Route, Routes } from "react-router-dom";
import EmployeeList from "../containers/EmployeeList/EmployeeList";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";

const TestContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/Employee" element={<EmployeeForm />} />
            <Route path="/Employee/:id" element={<EmployeeForm />} />
        </Routes>
    );
};

export default TestContainer;

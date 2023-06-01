import { QueryClient, QueryClientProvider } from "react-query";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import EditEmployeeForm from "./components/EditEmployeeForm/EditEmployeeForm";

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/newEmployee" element={<AddEmployeeForm />} />
                    <Route
                        path="/editEmployee/:id"
                        element={<EditEmployeeForm />}
                    />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;

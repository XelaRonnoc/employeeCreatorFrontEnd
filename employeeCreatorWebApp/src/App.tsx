import { QueryClient, QueryClientProvider } from "react-query";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/Employee" element={<EmployeeForm />} />
                    <Route path="/Employee/:id" element={<EmployeeForm />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;

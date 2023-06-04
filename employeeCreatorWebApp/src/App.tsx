import { QueryClient, QueryClientProvider } from "react-query";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import { store } from "./app/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/Employee" element={<EmployeeForm />} />
                        <Route
                            path="/Employee/:id"
                            element={<EmployeeForm />}
                        />
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

import { EmployeePayload } from "../components/AddEmployeeForm/AddEmployeeForm.tsx";
import instance from "./axios.ts";

export class Employee {
    public static async getAll(): Promise<any[]> {
        const response = await instance.get(`/employees`);
        const data = await response.data;
        console.log(data);
        return data;
    }

    public static async addEmployee(data: EmployeePayload): Promise<any> {
        const response = await instance.post(`/employees`, data);
        console.log(response);
        return response;
    }

    public static async deleteById(id: string): Promise<any> {
        const response = await instance.delete(`/employees/${id}`);
        return response;
    }
}

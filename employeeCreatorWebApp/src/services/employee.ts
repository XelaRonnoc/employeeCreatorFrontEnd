import { EmployeePayload } from "../components/EmployeeForm/EmployeeForm.tsx";
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
        return response;
    }

    public static async deleteById(id: string): Promise<any> {
        const response = await instance.delete(`/employees/${id}`);
        return response;
    }

    public static async getById(id: string): Promise<any> {
        const response = await instance.get(`employees/${id}`);
        return response;
    }

    public static async patchById(id: string, data: any): Promise<any> {
        const response = await instance.patch(`employees/${id}`, data);
        return response;
    }

    public static async putById(id: string, data: any): Promise<any> {
        const response = await instance.put(`employees/${id}`, data);
        return response;
    }
}

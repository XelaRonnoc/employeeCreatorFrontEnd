import instance from "./axios.ts";

export class Employee {
    static BASE_URL = "http://localhost:8080/";
    public static async getAll(): Promise<any[]> {
        const response = await instance.get(`/employees`);
        const data = await response.data;
        console.log(data);
        return data;
    }
}

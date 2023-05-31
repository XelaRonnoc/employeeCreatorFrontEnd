export class Employee {
    static BASE_URL = "http://localhost:8080/";
    public static async getAll(): Promise<any[]> {
        const response = await fetch(`${this.BASE_URL}employees`);
        const data = await response.json();
        console.log(data);
        return data;
    }
}

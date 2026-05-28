import axios, { type AxiosInstance } from "axios";

export interface HttpAdapter{
    get<T>(url: string): Promise<T>;
}

export class AxiosAdapter implements HttpAdapter{
    private  axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } =  await this.axios.get<T>(url);
        return data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}

import Condutor from "@/models/condutor";
import axios, { AxiosInstance } from "axios"

export class CondutorClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8080/api/condutor",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<Condutor[] | []> {
        try {
            return ( await this.axiosClient.get<Condutor[] | []>(`/`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async findById(id: string) : Promise<Condutor> {
        try {
            return ( await this.axiosClient.get<Condutor>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async create(condutor: Condutor) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, condutor)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async editById(id: Number, condutor: Condutor) : Promise<Condutor> {
        try {
            return ( await this.axiosClient.put<Condutor>(`/${id}`, condutor)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    private async deleteById(id: string) : Promise<string> {
        try {
            return ( await this.axiosClient.delete<string>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        } 
    }
}
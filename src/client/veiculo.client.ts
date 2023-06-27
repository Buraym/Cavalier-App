import Veiculo from "@/models/veiculo";
import axios, { AxiosInstance } from "axios"

export class VeiculoClient {

    private axiosClient: AxiosInstance;
    constructor () {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8090/api/veiculo",
            headers: {
                "Content-Type": "application/json"
            }
        })   
    }

    public async getList() : Promise<any[] | []> {
        try {
            return ( await this.axiosClient.get<any[] | []>(`/lista`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async findById(id: string) : Promise<any> {
        try {
            return ( await this.axiosClient.get<any>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async create(veiculo: any) : Promise<void> {
        try {
            return ( await this.axiosClient.post<void>(`/`, veiculo)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async editById(id: Number, veiculo: any) : Promise<any> {
        try {
            return ( await this.axiosClient.put<any>(`/${id}`, veiculo)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        }
    }

    public async deleteById(id: string) : Promise<string> {
        try {
            return ( await this.axiosClient.delete<string>(`/${id}`)).data;
        } catch (err:any) {
            return Promise.reject(err.response);
        } 
    }
}
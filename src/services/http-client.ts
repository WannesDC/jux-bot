import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import axios, { AxiosResponse } from "axios";
import { ApiCallEnum } from "../enumerations/api-call-enum";

@injectable()
export class HttpClient {

    private readonly key: string;

    
    constructor(@inject(TYPES.HostApi) apiKey: string){
        this.key = apiKey;
    }

    public async apiCall(apiClass : ApiCallEnum, selection : string | string [], id : string | string []) : Promise<AxiosResponse<any>> {

        let url = `https://api.torn.com/${apiClass}/${id.toString()}?selections=${selection.toString()}&key=${this.key}`;

        return await axios.get(url)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });

        

    }

}
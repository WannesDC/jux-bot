import { injectable, inject } from "inversify";
import { stock } from "../../types/stock";
import { TYPES } from "../../types";
import { HttpClient } from "../../services/http-client";
import { ApiCallEnum } from "../../enumerations/api-call-enum";
import { AxiosResponse } from "axios";

@injectable()
export class StocksSandbox {

    private httpClient: HttpClient;

    constructor(
        @inject(TYPES.HttpClient) client: HttpClient
      ) {
        this.httpClient = client;
      }

    public async getStocks() : Promise<AxiosResponse<stock[]>> {
        return await this.httpClient.apiCall(ApiCallEnum.torn, 'stocks', '');
    }
    
}
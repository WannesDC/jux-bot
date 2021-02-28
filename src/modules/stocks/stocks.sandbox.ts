import { injectable, inject } from "inversify";
import { stock } from "../../types/stock";
import { TYPES } from "../../types";
import { HttpClientService } from "../../services/http-client.service";
import { ApiCallEnum } from "../../enumerations/api-call-enum";
import { AxiosResponse } from "axios";

@injectable()
export class StocksSandbox {

    private httpClient: HttpClientService;

    constructor(
        @inject(TYPES.HttpClientService) client: HttpClientService
      ) {
        this.httpClient = client;
      }

    public async getStocks() : Promise<AxiosResponse<stock[]>> {
        return await this.httpClient.apiCall(ApiCallEnum.torn, 'stocks', '');
    }
    
}
import { injectable, inject } from "inversify";
import { HttpClientService } from "../../services/http-client.service";
import { TYPES } from "../../types";
import { profile } from "../../types/profile";
import { ApiCallEnum } from "../../enumerations/api-call-enum";
import { AxiosResponse } from "axios";

@injectable()
export class UserSandbox {

    private httpClient: HttpClientService;

    constructor(
        @inject(TYPES.HttpClientService) client: HttpClientService
      ) {
        this.httpClient = client;
      }

    public async getProfile(userId : string) : Promise<AxiosResponse<profile>> {
        return await this.httpClient.apiCall(ApiCallEnum.user, 'profile', userId);
    }

}
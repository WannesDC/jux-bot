import { injectable, inject } from "inversify";
import { StocksSandbox } from "./stocks.sandbox";
import { stock } from "../../types/stock";
import { TYPES } from "../../types";
import { AxiosResponse } from "axios";

@injectable()
export class StocksModule {
    private stocksSandbox : StocksSandbox

    constructor(
        @inject(TYPES.StocksSandbox) stocksSandbox: StocksSandbox
      ) {
        this.stocksSandbox = stocksSandbox;
      }


    public activateStockWatcher() {
        
    }

    public deActivateStockWatcher(){

    }

    private async getStocks() : Promise<AxiosResponse<stock[]>> {
        return await this.stocksSandbox.getStocks();
    }


}
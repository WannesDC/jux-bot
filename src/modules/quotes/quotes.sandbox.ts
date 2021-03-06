import { inject, injectable } from "inversify";
import { QuotesService } from "../../services/quotes.service";
import { TYPES } from "../../types";
import { QuoteEntity } from "../../types/database-entities/quote-entity";

@injectable()
export class QuotesSandbox {

    constructor(@inject(TYPES.QuotesService) private quotesService: QuotesService) {

    }

    public async getQuotes(): Promise<QuoteEntity[]>{
        return await this.quotesService.getQuotes();
    }

    public async addQuote(quote: string, userName: string, channelId: string, serverId: string){
        await this.quotesService.addQuote(quote, userName, channelId, serverId);
    }

    public async deleteQuote(quoteId: string) {
        await this.quotesService.deleteQuote(quoteId);
    }
}
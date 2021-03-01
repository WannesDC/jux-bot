import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";
import { QuoteEntity } from "../types/database-entities/quote-entity";

@injectable()
export class QuotesService {
  constructor(@inject(TYPES.DatabaseController) private db: DatabaseController) {}

  public async getQuotes(): Promise<QuoteEntity[]> {
    let query = `
        SELECT quote_id, quote, nickname, date_posted, channel_id, server_id FROM quotes
    `;

    return await this.db.executeQuery(query).then((result) => {
      return result.rows;
    });
  }

  public async addQuote(quote: string, userName: string, channelId: string, serverId: string) {
    let proofedQuote = quote.replace(/'/g, '\'\'');
    let query = `
         INSERT INTO quotes (quote, nickname, date_posted, channel_id, server_id) VALUES ('${proofedQuote}', '${userName}', CURRENT_DATE, '${channelId}', '${serverId}') ON CONFLICT DO NOTHING
         `;

    await this.db.executeQuery(query).catch((err) => console.log(err));
  }


}

import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";
import { QuoteEntity } from "../types/database-entities/quote-entity";

@injectable()
export class QuotesService {
  constructor(@inject(TYPES.DatabaseController) private db: DatabaseController) {}

  public async getQuotes(): Promise<QuoteEntity[]> {
    let query = `
        SELECT quote, nickname, date_posted FROM quotes
    `;

    return await this.db.executeQuery(query).then((result) => {
      return result.rows;
    });
  }

  public async addQuote(quote: string, userName: string) {
    let query = `
         INSERT INTO quotes (quote, nickname, date_posted) VALUES ('${quote}', '${userName}', CURRENT_DATE) ON CONFLICT DO NOTHING
         `;

    await this.db.executeQuery(query).catch((err) => console.log(err));
  }


}

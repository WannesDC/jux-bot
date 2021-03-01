import { timeStamp } from "console";
import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { QuoteEntity } from "../../types/database-entities/quote-entity";
import { Selector } from "../../utils/selector";
import { QuotesSandbox } from "./quotes.sandbox";

@injectable()
export class QuotesModule {

    constructor(@inject(TYPES.QuotesSandbox) private sandbox: QuotesSandbox, 
    @inject(TYPES.Selector) private selector: Selector) {

    }

    public async getRandomQuote(message : Message){ 
        await this.sandbox.getQuotes().then(result => {
            let randomQuote : QuoteEntity = this.selector.randomMessageSelector(result);
            message.channel.send(randomQuote.quote);
            message.channel.send("saved by " + randomQuote.nickname + " on "+ randomQuote.date_posted.toDateString())
        })
    }

    public async addQuote(message: Message) {
        let quote = message.content?.substring(6, message.content.length);
        
        let nickname = message.member?.nickname || "N/A"
        await this.sandbox.addQuote(quote, nickname).catch(err => console.log(err));
    }
}
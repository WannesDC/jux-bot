import { timeStamp } from "console";
import { Message, MessageEmbed } from "discord.js";
import { inject, injectable } from "inversify";
import { BotConstants } from "../../bot-constants";
import { TYPES } from "../../types";
import { QuoteEntity } from "../../types/database-entities/quote-entity";
import { CustomParsers } from "../../utils/custom-parsers";
import { Selector } from "../../utils/selector";
import { QuotesSandbox } from "./quotes.sandbox";

@injectable()
export class QuotesModule {

    constructor(@inject(TYPES.QuotesSandbox) private sandbox: QuotesSandbox, 
    @inject(TYPES.Selector) private selector: Selector,
    @inject(TYPES.CustomParsers) private customParsers: CustomParsers) {

    }

    public async getQuote(message : Message){ 
        let quoteId = parseInt(message.content.substring(8, message.content.length));
        let randomQuote : QuoteEntity;
        await this.sandbox.getQuotes().then(result => {

            randomQuote = result.find(quote => quote.quote_id === quoteId.toString()) || this.selector.randomMessageSelector(result);;

            let image = randomQuote.quote.match(/\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/) || []
            let footer = this.customParsers.parseConstants(BotConstants.QUOTE.SAVED,randomQuote.nickname,randomQuote.date_posted.toDateString());        

            const profileEmbed: MessageEmbed = new MessageEmbed();
                profileEmbed
                    .setTitle(BotConstants.QUOTE.TITLE + randomQuote.quote_id)
                    .setDescription(randomQuote.quote)
                    .setThumbnail(BotConstants.URL.LOGO)
                    .setImage(image[1])
                    .setFooter(footer);            

            message.channel.send(profileEmbed);
        })
    }

    public async addQuote(message: Message) {
        
        let quote = message.content?.substring(10, message.content.length); 
        let nickname = message.member?.nickname || "N/A";
        let channelId = message.channel.id;
        let serverId = message.guild?.id || "N/A";
        if(quote){
            await this.sandbox.addQuote(quote, nickname, channelId, serverId).then(() =>
                message.reply(BotConstants.QUOTE.ADDED)
            ).catch(err => console.log(err));
        } else if(message.reference?.messageID){
            message.channel.messages
            .fetch(message.reference.messageID)
            .then(async quote => {
                await this.sandbox.addQuote(quote.content, nickname, channelId, serverId).then(() =>
                message.reply(BotConstants.QUOTE.ADDED)
            ).catch(err => console.log(err));
            });
        } else {
            message.reply(BotConstants.ERROR.ARGUMENT_ERROR);
        }
    }

    public async deleteQuote(message: Message) {
        let quoteId : string = message.content?.substring(13, message.content.length); 

        if(quoteId) {
            await this.sandbox.deleteQuote(quoteId).then(() => 
                message.reply(BotConstants.QUOTE.DELETED + quoteId)
            ).catch(err => console.log(err));;
        } else {
            message.reply(BotConstants.ERROR.ARGUMENT_ERROR);
        }

    }
}
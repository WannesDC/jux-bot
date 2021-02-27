import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import { UserModule } from "../modules/user-info/user-info";
import { Selector } from "../utils/selector";
import { BotConstants } from "../bot-constants";
import { RandomResponses } from "../modules/random-responses/random-responses";

@injectable()
export class MessageResponder {

  private userModule: UserModule;
  private prefix: string;
  private random: RandomResponses

  constructor(
    @inject(TYPES.UserModule) userModule: UserModule,
    @inject(TYPES.Prefix) prefix: string,
    @inject(TYPES.Prefix) random: RandomResponses
  ) {
    this.userModule = userModule;
    this.prefix = prefix;
    this.random = random;
  }

  async handle(message: Message): Promise<Message | Message[]> {

    if(message.content.startsWith(this.prefix + BotConstants.COMMANDS.PING)){
        return message.channel.send('eurghhh... pong...');
    }


    //Quotes Module
    if(message.content.startsWith(this.prefix + BotConstants.COMMANDS.QUOTES)){
        return message.channel.send('quotes to be here soon');
    }


    // Stocks Module
    if(message.content.startsWith(this.prefix + BotConstants.COMMANDS.STOCK)){
        return message.channel.send('stocks to be here soonnibbles');
    }


    // Profile Module
    if(message.content.startsWith(this.prefix+ BotConstants.COMMANDS.USER)){
      await this.userModule.createProfileMessage(message)
      return message.delete();
    }
    
    // Easter Eggs
    
    this.random.randomResponses(message);

    return Promise.reject();
  }

}
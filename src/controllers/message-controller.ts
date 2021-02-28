import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserModule } from "../modules/user-info/user-info";
import { BotConstants } from "../bot-constants";
import { RandomResponses } from "../modules/random-responses/random-responses";
import { DatabaseController } from "./database-controller";
import { MockingSpongebob } from "../modules/mocking-spongebob-gen/mocking-spongebob-gen";

@injectable()
export class MessageResponder {
  private userModule: UserModule;
  private prefix: string;
  private random: RandomResponses;
  private db: DatabaseController;

  constructor(
    @inject(TYPES.UserModule) userModule: UserModule,
    @inject(TYPES.Prefix) prefix: string,
    @inject(TYPES.RandomResponses) random: RandomResponses,
    @inject(TYPES.DatabaseUrl) db: DatabaseController,
    @inject(TYPES.MockingSpongeBob) private mockingSpongebobGen: MockingSpongebob
  ) {
    this.userModule = userModule;
    this.prefix = prefix;
    this.random = random;
    this.db = db;
  }

  async handle(message: Message): Promise<Message | Message[]> {
  

    if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.GENERATE_DB) && message.author.id === '182150558638014464') {
      this.db.createTables();
      return message.delete();
    }

    if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.PING)) {
      return message.channel.send("eurghhh... pong...");
    }

    //Quotes Module
    if (
      message.content.startsWith(this.prefix + BotConstants.COMMANDS.QUOTES)
    ) {
      return message.channel.send("quotes to be here soon");
    }

    // Stocks Module
    if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.STOCK)) {
      return message.channel.send("stocks to be here soonnibbles");
    }

    // Profile Module
    if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.USER)) {
      await this.userModule.createProfileMessage(message);
      return message.delete();
    }

    if(this.mockingSpongebobGen.shouldMock()){
      console.log(message.cleanContent);
      let url = await this.mockingSpongebobGen.mockMessage(message.cleanContent);
      return message.channel.send(url);
    }

    // Easter Eggs
    
    this.random.randomResponses(message);

    return Promise.reject();
  }
}

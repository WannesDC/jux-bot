import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {UserModule} from "../modules/user-info/user-info";
import {BotConstants} from "../bot-constants";
import {RandomResponses} from "../modules/random-responses/random-responses";
import {DatabaseController} from "./database-controller";

class Command {
    obj: Object;
    func: Function;

    constructor(obj: Object, func: Function
    ) {
        this.obj = obj;
        this.func = func;
    }
}

@injectable()
export class MessageResponder {
  private prefix: string;
  private random: RandomResponses;
  private db: DatabaseController;
  private modules: Map<String, Command>;

    constructor(
        @inject(TYPES.UserModule) userModule: UserModule,
        @inject(TYPES.Prefix) prefix: string,
        @inject(TYPES.RandomResponses) random: RandomResponses,
        @inject(TYPES.DatabaseUrl) db: DatabaseController
    ) {
        this.prefix = prefix;
        this.random = random;
        this.db = db;

        this.modules = new Map([
            [BotConstants.COMMANDS.USER, new Command(userModule, userModule.createProfileMessage)],
            [BotConstants.COMMANDS.PING, new Command(this, this.handleMessage)],
            [BotConstants.COMMANDS.QUOTES, new Command(this, this.handleMessage)],
            [BotConstants.COMMANDS.STOCK, new Command(this, this.handleMessage)]
        ])
    }

    public async handleMessage(message: Message) {
        message.reply(BotConstants.ERROR.NOT_IMPLEMENTED);
    }

    async handle(message: Message): Promise<Message | Message[]> {

        // Handle modules from map.
        if (message.content.startsWith(this.prefix)) {
            let command = message.content.split(" ")[0].substr(1);
            let commandObj = this.modules.get(command);
            if (commandObj) {
                await commandObj.func.call(commandObj.obj, message);
                return message.delete();
            }
        }

        if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.GENERATE_DB) && message.author.id === '182150558638014464') {
            this.db.createTables();
            return message.delete();
        }

        // Easter Eggs

        this.random.randomResponses(message);

        return Promise.reject();
    }
}

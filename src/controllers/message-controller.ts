import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {UserModule} from "../modules/user-info/user-info";
import {BotConstants} from "../bot-constants";
import {RandomResponses} from "../modules/random-responses/random-responses";
import {DatabaseController} from "./database-controller";

@injectable()
export class MessageResponder {
    private prefix: string;
    private random: RandomResponses;
    private db: DatabaseController;
    private modules: Map<String, Function>;

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
            [BotConstants.COMMANDS.USER, userModule.createProfileMessage],
            [BotConstants.COMMANDS.PING, this.handleMessage],
            [BotConstants.COMMANDS.QUOTES, this.handleMessage],
            [BotConstants.COMMANDS.STOCK, this.handleMessage]
        ])
    }

    public async handleMessage(message: Message) {
        message.reply(BotConstants.ERROR.NOT_IMPLEMENTED);
    }

    async handle(message: Message): Promise<Message | Message[]> {

        // Handle modules from map.
        if (message.content.startsWith(this.prefix)) {
            let command = message.content.split(" ")[0].substr(1);
            if (this.modules.has(command)) {
                await (this.modules.get(command) || this.handleMessage).call(this, message);
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

import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserModule } from "../modules/user-info/user-info";
import { BotConstants } from "../bot-constants";
import { RandomResponses } from "../modules/random-responses/random-responses";
import { ManagementModule } from "../modules/management/management";
import { DatabaseController } from "./database-controller";

class Command {
  obj: Object;
  func: Function;

  constructor(obj: Object, func: Function) {
    this.obj = obj;
    this.func = func;
  }
}

@injectable()
export class MessageResponder {
  private prefix: string;
  private random: RandomResponses;
  private modules: Map<String, Command>;
  private adminModules: Map<String, Command>;

  constructor(
    @inject(TYPES.UserModule) userModule: UserModule,
    @inject(TYPES.Prefix) prefix: string,
    @inject(TYPES.RandomResponses) random: RandomResponses,
    @inject(TYPES.DatabaseUrl) private db: DatabaseController,
    @inject(TYPES.ManagementModule) private managementModule: ManagementModule
  ) {
    this.prefix = prefix;
    this.random = random;

    this.modules = new Map([
      [
        BotConstants.COMMANDS.USER,
        new Command(userModule, userModule.createProfileMessage),
      ],
      [BotConstants.COMMANDS.PING, new Command(this, this.handleMessage)],
      [BotConstants.COMMANDS.QUOTES, new Command(this, this.handleMessage)],
      [BotConstants.COMMANDS.STOCK, new Command(this, this.handleMessage)],
    ]);

    this.adminModules = new Map([
      [
        BotConstants.COMMANDS.ADMIN.GENERATE_DB,
        new Command(db, db.createTables),
      ],
      [
        BotConstants.COMMANDS.ADMIN.ADD_ADMIN_CHANNEL,
        new Command(managementModule, managementModule.addAdminChannel),
      ],
      [
        BotConstants.COMMANDS.ADMIN.DELETE_ADMIN_CHANNEL,
        new Command(managementModule, managementModule.deleteAdminChannel),
      ],
    ]);
  }

  public async handleMessage(message: Message) {
    message.reply(BotConstants.ERROR.NOT_IMPLEMENTED);
  }

  async handle(message: Message): Promise<Message | Message[]> {
    // Handle modules from map.
    if (message.content.startsWith(this.prefix)) {
      let command = message.content.split(" ")[0].substr(1);
      let commandObj = this.modules.get(command);
      let adminCommandObj = this.adminModules.get(command);
      if (commandObj) {
        await commandObj.func.call(commandObj.obj, message);
        return message.delete();
      } else if (
        adminCommandObj
        // &&
        // this.managementModule.isUserAdmin(message.author.id)
      ) {
        await adminCommandObj.func.call(adminCommandObj.obj, message);
        return message.delete();
      }
    }

    if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.HELP)) {
      message.reply(
        BotConstants.INFO.COMMAND_LIST +
          Array.from(this.modules.keys()).join(", ")
      );
      return message.delete();
    }

    if (
      message.content.startsWith(this.prefix + BotConstants.COMMANDS.ADMIN_HELP)
    ) {
      message.reply(
        BotConstants.INFO.ADMIN_COMMAND_LIST +
          Array.from(this.adminModules.keys()).join(", ")
      );
      return message.delete();
    }

    // Easter Eggs
    this.managementModule
      .getAdminChannels()
      .then((result) => {
        if (!result.find((e) => e.channel_id === message.channel.id)) {
          this.random.randomResponses(message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return Promise.reject();
  }
}

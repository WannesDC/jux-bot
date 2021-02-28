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
  private superUser: string;

  constructor(
    @inject(TYPES.UserModule) userModule: UserModule,
    @inject(TYPES.Prefix) prefix: string,
    @inject(TYPES.RandomResponses) random: RandomResponses,
    @inject(TYPES.DatabaseController) private db: DatabaseController,
    @inject(TYPES.ManagementModule) private managementModule: ManagementModule,
    @inject(TYPES.SuperUser) superUser: string,
  ) {
    this.prefix = prefix;
    this.random = random;
    this.superUser =superUser

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
      [
        BotConstants.COMMANDS.ADMIN.ADD_USER,
        new Command(managementModule, managementModule.addUser),
      ],
      [
        BotConstants.COMMANDS.ADMIN.ADD_ROLE,
        new Command(managementModule, managementModule.addRole),
      ],
      [
        BotConstants.COMMANDS.ADMIN.ADD_USER_ROLE,
        new Command(managementModule, managementModule.addUserRole),
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
      }else if (adminCommandObj) {
        //Checks whether the user is an admin, or me
        //All of these commands require you to have a database
        //test quickly by adding your discord user id to the right env variable
        this.managementModule
        .isUserAdmin(message.author.id)
        .then(async result => {
          if ((result === true || message.author.id===(this.superUser)) && adminCommandObj) {
            await adminCommandObj.func.call(adminCommandObj.obj, message);
            return message.delete();
          } else {
              message.reply(BotConstants.ERROR.NO_ADMIN);
          }
        });
      }
    }

    if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.ADMIN.GENERATE_DB) && message.author.id===(this.superUser)) {
      this.db.createTables();
      return message.delete();
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

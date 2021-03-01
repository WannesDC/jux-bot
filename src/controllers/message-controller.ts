import {Message, MessageEmbed} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {UserModule} from "../modules/user-info/user-info";
import {BotConstants} from "../bot-constants";
import {RandomResponses} from "../modules/random-responses/random-responses";
import {ManagementModule} from "../modules/management/management";
import {DatabaseController} from "./database-controller";

class Command {
    obj: Object;
    func: Function;
    admin: boolean;
    desc: String;

    constructor(obj: Object, func: Function, admin: boolean, desc: String) {
        this.obj = obj;
        this.func = func;
        this.admin = admin;
        this.desc = desc;
    }
}

@injectable()
export class MessageResponder {
    private prefix: string;
    private random: RandomResponses;
    private modules: Map<String, Command>;
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
        this.superUser = superUser

        this.modules = new Map([
            [BotConstants.COMMANDS.USER, new Command(userModule, userModule.createProfileMessage, false, BotConstants.COMMANDS.DESC.USER)],
            [BotConstants.COMMANDS.PING, new Command(this, this.handleMessage, false, BotConstants.COMMANDS.DESC.PING)],
            [BotConstants.COMMANDS.QUOTES, new Command(this, this.handleMessage, false, BotConstants.COMMANDS.DESC.QUOTES)],
            [BotConstants.COMMANDS.STOCK, new Command(this, this.handleMessage, false, BotConstants.COMMANDS.DESC.STOCK)],
            [BotConstants.COMMANDS.HELP, new Command(this, this.handleMessage, false, BotConstants.COMMANDS.DESC.HELP)],
            [BotConstants.COMMANDS.ADMIN.GENERATE_DB, new Command(db, db.createTables, true, BotConstants.COMMANDS.DESC.ADMIN.GENERATE_DB)],
            [BotConstants.COMMANDS.ADMIN.ADD_ADMIN_CHANNEL, new Command(managementModule, managementModule.addAdminChannel, true, BotConstants.COMMANDS.DESC.ADMIN.ADD_ADMIN_CHANNEL)],
            [BotConstants.COMMANDS.ADMIN.DELETE_ADMIN_CHANNEL, new Command(managementModule, managementModule.deleteAdminChannel, true, BotConstants.COMMANDS.DESC.ADMIN.DELETE_ADMIN_CHANNEL)],
            [BotConstants.COMMANDS.ADMIN.ADD_USER, new Command(managementModule, managementModule.addUser, true, BotConstants.COMMANDS.DESC.ADMIN.ADD_USER)],
            [BotConstants.COMMANDS.ADMIN.ADD_ROLE, new Command(managementModule, managementModule.addRole, true, BotConstants.COMMANDS.DESC.ADMIN.ADD_ROLE)],
            [BotConstants.COMMANDS.ADMIN.ADD_USER_ROLE, new Command(managementModule, managementModule.addUserRole, true, BotConstants.COMMANDS.DESC.ADMIN.ADD_USER_ROLE)],
        ]);
    }

    public async handleMessage(message: Message) {
        message.reply(BotConstants.ERROR.NOT_IMPLEMENTED);
    }

    async handle(message: Message): Promise<Message | Message[]> {

        // !help command. (MUST BE BEFORE HANDLING MODULES)
        if (message.content.startsWith(this.prefix + BotConstants.COMMANDS.HELP)) {
            let keyList: String = "", descList: String = "";
            this.modules.forEach((command: Command, key: String) => {
                this.managementModule.isUserAdmin(message.author.id).then( res => {
                  if (!command.admin || res || message.author.id === (this.superUser)) {
                    keyList += key + "  \n";
                    descList += command.desc + "  \n";
                  }
                });
            });
            const profileEmbed: MessageEmbed = new MessageEmbed();
            profileEmbed
                .setTitle(BotConstants.INFO.COMMAND_LIST.TITLE)
                .setDescription(BotConstants.INFO.COMMAND_LIST.DESC)
                .setThumbnail(BotConstants.URL.LOGO)
                .addFields(
                    {name: BotConstants.INFO.COMMAND_LIST.COMMAND_TITLE, value: keyList, inline: true},
                    {name: BotConstants.INFO.COMMAND_LIST.COMMAND_DESC, value: descList, inline: true}
                )
                .setTimestamp()
                .setFooter(BotConstants.INFO.COMMAND_LIST.FOOTER, BotConstants.URL.LOGO);
            message.channel.send(profileEmbed);
            return message.delete();
        }

        // Handle modules from map.
        if (message.content.startsWith(this.prefix)) {
            let command = message.content.split(" ")[0].substr(1);
            let commandObj = this.modules.get(command);
            if (commandObj) {
              this.managementModule.isUserAdmin(message.author.id).then(async res => {
                if (!commandObj?.admin || res
                  || message.author.id === (this.superUser)) {
                  await commandObj?.func.call(commandObj?.obj, message);
              } else {
                  message.reply(BotConstants.ERROR.NO_ADMIN);
              }
              return message.delete();
              })
            }
        }

        // Easter Eggs
        this.managementModule
            .getAdminChannels()
            .then((result: any[]) => {
                if (!result.find((e) => e.channel_id === message.channel.id)) {
                    this.random.randomResponses(message);
                }
            })
            .catch((err: any) => {
                console.log(err);
            });

        return Promise.reject();
    }
}

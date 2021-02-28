import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { BotConstants } from "../../bot-constants";
import { TYPES } from "../../types";
import { channelEntity } from "../../types/database-entities/channel-entity";
import { ManagementSandbox } from "./management.sandbox";

@injectable()
export class ManagementModule {
  constructor(
    @inject(TYPES.ManagementSandbox) private sandbox: ManagementSandbox
  ) {}

  public async addAdminChannel(message: Message) {
    this.sandbox.addAdminChannel(message.channel.id);
  }

  public getAdminChannels(): Promise<channelEntity[]> {
    return this.sandbox.getAdminChannels();
  }

  public deleteAdminChannel(message: Message) {
    this.sandbox.deleteAdminChannel(message.channel.id);
  }

  public isUserAdmin(id: string): Promise<boolean> {
    return this.sandbox.isUserAdmin(id);
  }

  public addUser(message: Message) {
    let variables: string[] = message.content.split(" ");

    if (variables.length != 4) {
      message.reply(BotConstants.ERROR.ARGUMENT_ERROR);
      return;
    }
    let player_id = variables[1];
    let user_name = variables[2];
    let api_key = variables[3];
    let user_id = message.author.id;

    this.sandbox.addUser(player_id, user_name, api_key, user_id);
  }

  public addRole(message: Message) {
    let variables: string[] = message.content.split(" ");

    if (variables.length != 3) {
      message.reply(BotConstants.ERROR.ARGUMENT_ERROR);
      return;
    }
    let role_id = variables[1];
    let role_name = variables[2];
    let server = message.guild?.id;

    this.sandbox.addRole(role_id, role_name, server);
  }

  public addUserRole(message: Message) {
    let variables: string[] = message.content.split(" ");

    if (variables.length != 3) {
      message.reply(BotConstants.ERROR.ARGUMENT_ERROR);
      return;
    }
    let user_id = variables[1];
    let role_id = variables[2];

    this.sandbox.addUserRole(user_id, role_id);
  }
}

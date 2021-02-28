import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { channelEntity } from "../../types/database-entities/channel-entity";
import { ManagementSandbox } from "./management.sandbox";

@injectable()
export class ManagementModule {
  constructor(@inject(TYPES.ManagementSandbox) private sandbox: ManagementSandbox) {}

  public async addAdminChannel(message: Message) {
    this.sandbox.addAdminChannel(message.channel.id);
  }

  public getAdminChannels(): Promise<channelEntity[]> {
    return this.sandbox.getAdminChannels();
  }

  public deleteAdminChannel(message: Message) {
      this.sandbox.deleteAdminChannel(message.channel.id);
  }

  public isUserAdmin(id: string) {
    this.sandbox.isUserAdmin(id);
  }
}

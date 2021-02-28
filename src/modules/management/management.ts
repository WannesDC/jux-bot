import { Message } from "discord.js";
import { injectable } from "inversify";

@injectable()
export class ManagementModule {
  constructor() {}

  public async addAdminChannel(message: Message) {
      
  }

  public getAdminChannels(): string[] {
    return [];
  }

  public isUserAdmin(id: string) {
    throw new Error("Method not implemented.");
  }
}

import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";
import { channelEntity } from "../types/database-entities/channel-entity";

@injectable()
export class AdminChannelsService {
  constructor(@inject(TYPES.DatabaseController) private db: DatabaseController) {}

  public async getAdminChannels(): Promise<channelEntity[]> {
    let query = `
        SELECT channel_id FROM admin_channels
    `;
    
    return await this.db.executeQuery(query).then(result => {
        return result.rows
    });
  }

  public addAdminChannel(id: string) {
    let query = `
        INSERT INTO admin_channels Values(${id}) ON CONFLICT DO NOTHING
        `;
    this.db.executeQuery(query);
  }

  public removeAdminChannel(id: string) {
    let query = `
    DELETE FROM admin_channels WHERE channel_id = '${id}'
    `;
    this.db.executeQuery(query);
  }
}

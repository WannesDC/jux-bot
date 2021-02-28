import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";

@injectable()
export class AdminChannelsService {
  constructor(@inject(TYPES.DatabaseUrl) private db: DatabaseController) {}

  public getAdminChannels() {
    let query = `
        SELECT channel_id FROM admin_channel
    `;
    
    this.db.executeQuery(query).then(res => console.log(res));
  }

  public addAdminChannel(id: string) {
    let query = `
        INSERT INTO admin_channels Values(${id}) ON CONFLICT DO NOTHING) 
        `;
    this.db.executeQuery(query);
  }

  public removeAdminChannel(id: string) {
    let query = `
    DELETE FROM admin_channels WHERE channel_id = ${id}) 
    `;
    this.db.executeQuery(query);
  }
}

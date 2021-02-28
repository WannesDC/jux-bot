import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";

@injectable()
export class RoleService {
  constructor(@inject(TYPES.DatabaseUrl) private db: DatabaseController) {}

  public addRole(id: string, name: string, server?: string) {
    let query = `
        INSERT INTO (id, name ${
          server ? "," + server : ""
        }) role Values(${id}, ${name} ${
      server ? "," + server : ""
    } ON CONFLICT DO NOTHING) 
        `;
    this.db.executeQuery(query);
  }

  public updateRole(id: string, name?: string, server?: string) {
    let query = `
        UPDATE role SET role_name = ${name ? "," + name : ""}, server_id = ${
      server ? "," + server : ""
    } WHERE role_id = ${id}) 
        `;
    this.db.executeQuery(query);
  }

  public deleteRole(id: string) {
    let query = `
        DELETE FROM role WHERE role_id = ${id}) 
        `;
    this.db.executeQuery(query);
  }
}

import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";
import { roleEntity } from "../types/database-entities/role-entity";

@injectable()
export class RoleService {
  constructor(@inject(TYPES.DatabaseController) private db: DatabaseController) {}

  public async findRolesById(id: string): Promise<roleEntity> {
    let query = `
        SELECT * FROM users WHERE role_id = ${id}
    `;

    return await this.db.executeQuery(query).then((result) => {
      return result.rows[0];
    });
  }

  public addRole(id: string, name: string, server?: string) {
    let query = `
        INSERT INTO roles (role_id, role_name, server_id) VALUES ('${id}', '${name}', '${server}') ON CONFLICT DO NOTHING
        `;
    this.db.executeQuery(query).catch((err) => console.log(err));
  }

  public updateRole(id: string, name?: string, server?: string) {
    let query = `
        UPDATE role SET role_name = ${name ? "," + name : ""}, server_id = ${
      server ? "," + server : ""
    } WHERE role_id = ${id}
        `;
    this.db.executeQuery(query);
  }

  public deleteRole(id: string) {
    let query = `
        DELETE FROM role WHERE role_id = ${id}
        `;
    this.db.executeQuery(query);
  }
}

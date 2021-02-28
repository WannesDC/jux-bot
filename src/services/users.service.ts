import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";
import { userEntity } from "../types/database-entities/user-entity";

@injectable()
export class UserService {
  constructor(@inject(TYPES.DatabaseUrl) private db: DatabaseController) {}

  public addUser(
    player_id: string,
    player_name: string,
    api_key: string,
    discord_user_id: string
  ) {
    let query = `
        INSERT INTO users Values(${discord_user_id},${player_id},${player_name},${api_key}) ON CONFLICT DO NOTHING
        `;
    this.db.executeQuery(query);
  }

  public updateUser() {
    let query = `
        UPDATE role SET 
        `;
    this.db.executeQuery(query);
  }

  public async getUserById(user_id: string): Promise<userEntity> {
    let query = `
        SELECT * FROM users WHERE discord_user_id = ${user_id}
    `;

    return await this.db.executeQuery(query).then((result) => {
      return result.rows[0];
    });
  }

  public async getUserByPlayerId(player_id: string): Promise<userEntity> {
    let query = `
        SELECT * FROM users WHERE player_id = ${player_id}
    `;

    return await this.db.executeQuery(query).then((result) => {
      return result.rows[0];
    });
  }

  public async isUserAdmin(user_id: string): Promise<boolean> {
    let query = `
    SELECT role_id FROM users u WHERE discord_user_id = ${user_id} JOIN user_roles ur ON (u.discord_user_id = ur.discord_user_id)
`;
    //get role_id, check whether it's an admin role
    return await this.db.executeQuery(query).then((result) => {
      return result.rows.find(e => e.role_id === 'whatever_id_superadmin has');
    });
  }
}

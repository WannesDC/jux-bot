import { inject, injectable } from "inversify";
import { BotConstants } from "../bot-constants";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";
import { userEntity } from "../types/database-entities/user-entity";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.DatabaseController) private db: DatabaseController
  ) {}

  public addUser(
    player_id: string,
    player_name: string,
    api_key: string,
    discord_user_id: string
  ) {
    let query = `
        INSERT INTO users VALUES ('${player_id}','${player_name}','${api_key}','${discord_user_id}') ON CONFLICT DO NOTHING
        `;
    this.db.executeQuery(query).catch((err) => console.log(err));
  }

  //   public updateUser() {
  //     let query = `
  //         UPDATE role SET
  //         `;
  //     this.db.executeQuery(query);
  //   }

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
    SELECT role_id FROM users u INNER JOIN user_roles ur ON (u.discord_user_id = ur.discord_user_id) WHERE ur.discord_user_id = '${user_id}' 
`;
    //get role_id, check whether it's an admin role
    let result = await this.db.executeQuery(query);
    let match = result.rows.find(
      (e) => e.role_id === BotConstants.ROLES.SUPER_ADMIN
    );
    return match && true // assuming .find returns null if not found
  }

  public addRoleToUser(user_id: string, role_id: string) {
    let query = `
    INSERT INTO user_roles Values(${user_id},${role_id}) ON CONFLICT DO NOTHING
    `;
    this.db.executeQuery(query);
  }
}

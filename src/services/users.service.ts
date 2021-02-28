import { inject, injectable } from "inversify";
import { DatabaseController } from "../controllers/database-controller";
import { TYPES } from "../types";

@injectable()
export class UserService {
  constructor(@inject(TYPES.DatabaseUrl) private db: DatabaseController) {}

  public addUser(player_id : string, player_name : string, api_key : string, discord_user_id : string) {
    let query = `
        INSERT INTO users Values(${discord_user_id},${player_id},${player_name},${api_key}) ON CONFLICT DO NOTHING) 
        `;
    this.db.executeQuery(query);
  }

  public updateUser() {
    let query = `
        UPDATE role SET 
        `;
    this.db.executeQuery(query);
  }

  public getUserById(user_id: string) {
    let query = `
        SELECT * FROM users WHERE discord_user_id = ${user_id}
    `;

    this.db.executeQuery(query).then((res) => console.log(res));
  }

  public getUserByPlayerId(player_id: string) {
    let query = `
        SELECT * FROM users WHERE discord_user_id = ${player_id}
    `;

    this.db.executeQuery(query).then((res) => console.log(res));
  }

  public isUserAdmin(user_id: string): boolean {
    let query = `
    SELECT role_id FROM users u WHERE discord_user_id = ${user_id} JOIN user_roles ur ON (u.discord_user_id = ur.discord_user_id)
`;
    //get role_id, check whether it's an admin role
    this.db.executeQuery(query).then((res) => console.log(res));

    //return true if admin, false if not.
    return true;
  }
}

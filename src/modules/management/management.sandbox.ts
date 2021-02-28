import { inject, injectable } from "inversify";
import { AdminChannelsService } from "../../services/admin-channels.service";
import { RoleService } from "../../services/roles.service";
import { UserService } from "../../services/users.service";
import { TYPES } from "../../types";
import { channelEntity } from "../../types/database-entities/channel-entity";
import { roleEntity } from "../../types/database-entities/role-entity";
import { userEntity } from "../../types/database-entities/user-entity";

@injectable()
export class ManagementSandbox {
  constructor(
    @inject(TYPES.AdminChannelsService)
    private adminChannels: AdminChannelsService,
    @inject(TYPES.RoleService) private roles: RoleService,
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  public async getAdminChannels(): Promise<channelEntity[]> {
    return await this.adminChannels.getAdminChannels();
  }

  public addAdminChannel(channel_id: string) {
    this.adminChannels.addAdminChannel(channel_id);
  }

  public deleteAdminChannel(channel_id: string) {
    this.adminChannels.removeAdminChannel(channel_id);
  }

  public findRoleById(role_id: string): Promise<roleEntity> {
    return this.roles.findRolesById(role_id);
  }

  public addRole(id: string, name: string, server?: string) {
    this.roles.addRole(id, name, server);
  }

  //  public updateRole(id: string, name?: string, server?: string) {
  //     this.roles.updateRole(id, name, server);
  //  }

  //  public deleteRole(id: string) {
  //     this.roles.deleteRole(id);
  //  }


  public addUser(
    player_id: string,
    player_name: string,
    api_key: string,
    discord_user_id: string
  ) {
    this.userService.addUser(player_id, player_name, api_key, discord_user_id);
  }

  public getUserById(user_id: string): Promise<userEntity> {
    return this.userService.getUserById(user_id);
  }

  public getUserByPlayerId(player_id: string): Promise<userEntity> {
    return this.userService.getUserByPlayerId(player_id);
  }

  public isUserAdmin(user_id: string): Promise<boolean> {
    return this.userService.isUserAdmin(user_id);
  }

  public addUserRole(user_id: string, role_id: string) {
    return this.userService.addRoleToUser(user_id, role_id);
  }
}

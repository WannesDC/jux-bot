import { inject, injectable } from "inversify";
import { AdminChannelsService } from "../../services/admin-channels.service";
import { RoleService } from "../../services/roles.service";
import { UserService } from "../../services/users.service";
import { TYPES } from "../../types";

@injectable()
export class ManagementSandbox {
     constructor(@inject(TYPES.AdminChannelsService) private adminChannels: AdminChannelsService,
     @inject(TYPES.RoleService) private roles: RoleService,
     @inject(TYPES.UserService) private users: UserService) {

     }
}
import { AxiosResponse } from "axios";
import { Message, MessageEmbed } from "discord.js";
import { inject, injectable } from "inversify";
import { BotConstants } from "../../bot-constants";
import { Companies } from "../../enumerations/companies";
import { States } from "../../enumerations/states";
import { TYPES } from "../../types";
import { profile } from "../../types/profile";
import { CustomParsers } from "../../utils/custom-parsers";
import { UserSandbox } from "./user.sandbox";


@injectable()
export class UserModule {


    private userSandbox : UserSandbox
    private customParsers: CustomParsers

    constructor(
        @inject(TYPES.UserSandbox) userSandbox: UserSandbox,
        @inject(TYPES.CustomParsers) customParsers: CustomParsers
      ) {
        this.userSandbox = userSandbox;
        this.customParsers = customParsers;
      }

      public async createProfileMessage(message: Message) {
        let nickname = message.mentions.members?.first()?.nickname?.valueOf();
        let matches = nickname?.match(/\[(.*?)\]/);

        
        let userId = message.content.substring(6, message.content.length)

        if((!userId && !matches) || !userId) {
          message.reply(BotConstants.ERROR.NO_ID);
          return;
        }

        if(!parseInt(userId) && !matches){
          message.reply(BotConstants.ERROR.PLAYER_ID_NO_NUMBER);
          return;
        }

        if (matches && parseInt(matches[1])) {
          userId = matches[1];
        }

        await this.getProfile(userId).then(response => {
          let data = response.data;
          let playerID = data?.player_id;
          if(playerID?.toString() === userId){
            try {
              let title = this.customParsers.parseConstants(BotConstants.PROFILE.TITLE, 
                data.name, 
                playerID);

              let description = this.customParsers.parseConstants(BotConstants.PROFILE.DESCRIPTION,
                data.level,
                data?.faction?.faction_name);

              let lifeDescription = this.customParsers.parseConstants(BotConstants.PROFILE.DESCRIPTIONS.LIFE,
                data.life.current,
                data.life.maximum);

              let factionDescription = this.customParsers.parseConstants(BotConstants.PROFILE.DESCRIPTIONS.FACTION,
                data.faction.position,
                data.faction.faction_name,
                data.faction.faction_id,
                BotConstants.URL.FACTION+data.faction.faction_id,
                data.faction.days_in_faction);

              let companyDescription = this.customParsers.parseConstants(BotConstants.PROFILE.DESCRIPTIONS.COMPANY, 
                data.job.position, 
                data.job.company_name);
              
              let marriageDescription = this.customParsers.parseConstants(BotConstants.PROFILE.DESCRIPTIONS.MARRIAGE,
                data.married.spouse_name,
                data.married.spouse_id, 
                BotConstants.URL.PROFILE+data.married.spouse_id, 
                data.married.duration);
              
              let links =  this.customParsers.parseConstants(BotConstants.PROFILE.DESCRIPTIONS.LINKS, 
                BotConstants.URL.ATTACK+playerID, 
                BotConstants.URL.BOUNTY+playerID, 
                BotConstants.URL.MESSAGE+playerID,
                BotConstants.URL.SEND_CASH+playerID, 
                BotConstants.URL.TRADE+playerID);
           
              const profileEmbed : MessageEmbed = new MessageEmbed();
              profileEmbed.setTitle(title)
                .setURL(BotConstants.URL.PROFILE+data.player_id)
                .setDescription(description)
                .setThumbnail(BotConstants.URL.LOGO)
                .addFields(
                  {name: BotConstants.PROFILE.TITLES.LIFE, 
                    value: lifeDescription , inline: true},
                  {name: BotConstants.PROFILE.TITLES.STATUS, 
                    value: data.status.description, inline: true},
                )
                .addField(BotConstants.PROFILE.TITLES.FACTION, 
                  factionDescription)
                .addFields(
                  { name :BotConstants.PROFILE.TITLES.COMPANY, 
                    value: companyDescription, inline: true},
                  { name :BotConstants.PROFILE.TITLES.COMPANY_TYPE, 
                    value: Companies[`C${data.job.company_type}` as keyof typeof Companies], inline: true}
                )
                .addField(BotConstants.PROFILE.TITLES.MARRIAGE, marriageDescription)
                .addField(BotConstants.PROFILE.TITLES.LINKS,links)
                .setTimestamp()
                .setFooter(BotConstants.PROFILE.FOOTER, BotConstants.URL.LOGO)
                .setColor(States[`${data.last_action.status}` as keyof typeof States]);
                
              message.channel.send(profileEmbed);
            } catch (err) {
              message.channel.send(err);
            }
          } else {
            message.reply(BotConstants.ERROR.PLAYER_ID+userId);
          }
        }).catch(
          err => console.log(err)
        );
      }

      private async getProfile(userId: string) : Promise<AxiosResponse<profile>> {
        return await this.userSandbox.getProfile(userId);
      }
}
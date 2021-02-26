import {Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import { UserModule } from "../modules/user-info/user-info";
import { Selector } from "../utils/selector";
import { BotConstants } from "../bot-constants";

@injectable()
export class MessageResponder {

  private userModule: UserModule;
  private selector: Selector;
  private prefix: string;

  constructor(
    @inject(TYPES.UserModule) userModule: UserModule,
    @inject(TYPES.Selector) selector: Selector,
    @inject(TYPES.Prefix) prefix: string
  ) {
    this.userModule = userModule;
    this.selector = selector;
    this.prefix = prefix;
  }

  async handle(message: Message): Promise<Message | Message[]> {

    if(message.content.startsWith(this.prefix + BotConstants.COMMANDS.PING)){
        return message.channel.send('eurghhh... pong...');
    }


    //Quotes Module
    if(message.content.startsWith(this.prefix + BotConstants.COMMANDS.QUOTES)){
        return message.channel.send('quotes to be here soon');
    }


    // Stocks Module
    if(message.content.startsWith(this.prefix + BotConstants.COMMANDS.STOCK)){
        return message.channel.send('stocks to be here soonnibbles');
    }


    // Profile Module
    if(message.content.startsWith(this.prefix+ BotConstants.COMMANDS.USER)){
      await this.userModule.createProfileMessage(message)
      return message.delete();
    }


    //Easter eggs

    if(message.author.id === '190986660895260673' && Math.random() < .01){
      let replies = ['Oh yes... Daddy Kuro!', //
       'Kurt!', //
       'How did you like Avatar: the last airbender, the movie?', //
       'Hey'//
      ]
      return message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if(message.member?.roles.cache.some(role => role.name === BotConstants.ROLES.CLOGS_ROLE) && Math.random() < .01){
      let replies = ['clogs, lol', //
      'ew Dutch people', //
      'Can I have some cheese', //
      'Hey'
     ]
      return message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if(message.member?.roles.cache.some(role => role.name === BotConstants.ROLES.STEP_LEADER_ROLE) && Math.random() < .01){
      let replies = ['What are you doing Step Leader!', //
      'Don\'t be Rhinkey Dink', //
      'Just blame Harley', //
      'Hey'
     ]
      return message.channel.send(this.selector.randomMessageSelector(replies));
    }

    return Promise.reject();
  }

}
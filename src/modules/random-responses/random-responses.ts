import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { BotConstants } from "../../bot-constants";
import { TYPES } from "../../types";
import { Selector } from "../../utils/selector";

@injectable()
export class RandomResponses {
  private selector: Selector;
  constructor(@inject(TYPES.Selector) selector: Selector) {
    this.selector = selector;
  }

  public async randomResponses(message: Message) {
    if (message.author.id === "190986660895260673" && Math.random() < 0.01) {
      let replies = [
        "Oh yes... Daddy Kuro!", //
        "Kurt!", //
        "How did you like Avatar: the last airbender, the movie?", //
        "Hey", //
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (message.author.id === "117404572158394373" && Math.random() < 0.01) {
      let replies = [
        "Squash the bug!", //
        "Oh noes, someone make a bug report!", //
        "<-- 404 response not found -->", //
        "Hey", //
      ];
      return message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (
      message.member?.roles.cache.some(
        (role) => role.name === BotConstants.ROLES.CLOGS_ROLE
      ) &&
      Math.random() < 0.01
    ) {
      let replies = [
        "clogs, lol", //
        "ew Dutch people", //
        "Can I have some cheese", //
        "Hey",
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (
      message.member?.roles.cache.some(
        (role) => role.name === BotConstants.ROLES.STEP_LEADER_ROLE
      ) &&
      Math.random() < 0.01
    ) {
      let replies = [
        "What are you doing Step Leader!", //
        "Don't be Rhinkey Dink", //
        "Just blame Harley", //
        "Hey",
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }
  }
}

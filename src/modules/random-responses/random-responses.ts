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
        "No Daddy Please!", //
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

    if(message.author.id === "434052059369570304" && Math.random() < 0.01) {
      let replies = [
        "Stop being a drama queen *flips hair*", //
        "I'm sorry", //
        "Can I have some poutine", //
        "i'm a slut for pineapple too"
      ];
      return message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (
      message.member?.roles.cache.some(
        (role) => role.name === BotConstants.ROLES.HOT_STUFF
      ) &&
      Math.random() < 0.01
    ) {
      let replies = [
        "Oh yes bb", //
        "Give it to me", //
        "Mmmm cheese", //
        "Yes Daddy",
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
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
        (role) => role.name === BotConstants.ROLES.TRAITOR
      ) &&
      Math.random() < 0.01
    ) {
      let replies = [
        "You traitor :(", //
        "Filthy traitor, we miss you", //
        "No kattenstoet plushies for you!"
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (
      message.member?.roles.cache.some(
        (role) => role.name === BotConstants.ROLES.LITTLE_TOES
      ) &&
      Math.random() < 0.005
    ) {
      let replies = [
        "Dem little toes though!", 
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (
      message.member?.roles.cache.some(
        (role) => role.name === BotConstants.ROLES.JUX_HQ
      ) &&
      Math.random() < 0.005
    ) {
      let replies = [
        "more like Jokes HQ"
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }

    if (
      message &&
      Math.random() < 0.001
    ) {
      let replies = [
        "Happy Birthday"
      ];
      message.reply(this.selector.randomMessageSelector(replies));
    }

    if (
      message.member?.roles.cache.some(
        (role) => role.name === BotConstants.ROLES.STEP_LEADER_ROLE
      ) &&
      Math.random() < 0.01
    ) {
      let replies = [
        "What are you doing Step Leader!", //
        "Don't be Rhinky Dink", //
        "Just blame Harley", //
        "Hey",
      ];
      message.channel.send(this.selector.randomMessageSelector(replies));
    }
  }
}

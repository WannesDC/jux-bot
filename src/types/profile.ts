import { competition } from "./competition";
import { faction } from "./faction";
import { job } from "./job";
import { lastAction } from "./last-action";
import { life } from "./life";
import { married } from "./married";
import { states } from "./states";
import { status } from "./status";

export interface profile extends Readonly<{
    rank: string,
    level: number,
    gender: string,
    property: string,
    signup: string,
    awards: number,
    friends: number,
    enemies: number,
    forum_posts: number,
    karma: number,
    role: string,
    donator: number,
    player_id: number,
    name: string,
    property_id: number,
    competition: competition,
    life: life,
    status: status,
    job: job,
    faction: faction,
    married: married,
    basicIcons: [key: string],
    states: states,
    last_action: lastAction

}>{}
import { status } from "./status";

export interface basic extends Readonly<{
    level: number,
    gender: string,
    player_id: number,
    name: string,
    status: status
}>{}
export interface life extends Readonly<{
    current: number,
    maximum: number,
    increment: number,
    interval: number,
    ticktime: number,
    fulltime: number
}>{}
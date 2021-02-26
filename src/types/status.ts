export interface status extends Readonly<{
    description: string,
    details: string,
    state: string,
    color: string,
    until: number
}>{}
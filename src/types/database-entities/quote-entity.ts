export interface QuoteEntity extends Readonly<{
    quote_id: number
    quote: string,
    nickname: string,
    date_posted: Date,
    channel_id : string,
    serverid: string
}>{}
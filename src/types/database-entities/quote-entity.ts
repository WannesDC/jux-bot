export interface QuoteEntity extends Readonly<{
    quote: string,
    nickname: string,
    date_posted: Date
}>{}
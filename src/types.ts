export const TYPES = {
    Bot: Symbol("Bot"),
    Client: Symbol("Client"),
    //env vars
    Token: Symbol("Token"),
    HostApi: Symbol("HostApi"),
    Prefix: Symbol("Prefix"),
    DatabaseUrl: Symbol("DatabaseUrl"),
    SuperUser: Symbol("SuperUser"),
    //framework
    MessageResponder: Symbol("MessageResponder"),
    Selector: Symbol("Selector"),
    CustomParsers: Symbol("CustomParsers"),
    DatabaseController: Symbol('DatabaseController'),
    //Services
    HttpClientService: Symbol("HttpClientService"),
    AdminChannelsService: Symbol("AdminChannelsService"),
    RoleService: Symbol("RoleService"),
    UserService: Symbol("UserService"),
    QuotesService: Symbol("QuotesService"),
    //User Module
    UserSandbox: Symbol("UserSandbox"),
    UserModule: Symbol("UserModule"),
    //Stocks Module
    StocksSandbox: Symbol("StocksSandbox"),
    StocksModule: Symbol("StocksModule"),
    //Random Module
    RandomResponses: Symbol("RandomResponses"),
    //Management Module
    ManagementModule: Symbol("ManagementModule"),
    ManagementSandbox: Symbol("ManagementSandbox"),
    //Quotes Module
    QuotesModule: Symbol("QuotesModule"),
    QuotesSandbox: Symbol("QuotesSandbox")
  };
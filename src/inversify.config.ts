import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";
import { MessageResponder } from "./controllers/message-controller";
import { HttpClientService } from "./services/http-client.service";
import { UserSandbox } from "./modules/user-info/user.sandbox";
import { UserModule } from "./modules/user-info/user-info";
import { StocksSandbox } from "./modules/stocks/stocks.sandbox";
import { StocksModule } from "./modules/stocks/stocks";
import { Selector } from "./utils/selector";
import { CustomParsers } from "./utils/custom-parsers";
import { RandomResponses } from "./modules/random-responses/random-responses";
import { DatabaseController } from "./controllers/database-controller";
import { ManagementModule } from "./modules/management/management";
import { AdminChannelsService } from "./services/admin-channels.service";
import { RoleService } from "./services/roles.service";
import { UserService } from "./services/users.service";
import { ManagementSandbox } from "./modules/management/management.sandbox";
import { QuotesService } from "./services/quotes.service";
import { QuotesModule } from "./modules/quotes/quotes";
import { QuotesSandbox } from "./modules/quotes/quotes.sandbox";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

//env
container.bind<string>(TYPES.Token).toConstantValue(<string>process.env.TOKEN);
container.bind<string>(TYPES.HostApi).toConstantValue(<string>process.env.HOSTAPI);
container.bind<string>(TYPES.Prefix).toConstantValue(<string>process.env.PREFIX);
container.bind<string>(TYPES.SuperUser).toConstantValue(<string>process.env.SUPERUSER);

//Framework
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<Selector>(TYPES.Selector).to(Selector).inSingletonScope();
container.bind<CustomParsers>(TYPES.CustomParsers).to(CustomParsers).inSingletonScope();
container.bind<DatabaseController>(TYPES.DatabaseController).to(DatabaseController).inSingletonScope();

//Services
container.bind<HttpClientService>(TYPES.HttpClientService).to(HttpClientService).inSingletonScope();
container.bind<AdminChannelsService>(TYPES.AdminChannelsService).to(AdminChannelsService).inSingletonScope();
container.bind<RoleService>(TYPES.RoleService).to(RoleService).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<QuotesService>(TYPES.QuotesService).to(QuotesService).inSingletonScope();

//User Module
container.bind<UserSandbox>(TYPES.UserSandbox).to(UserSandbox).inSingletonScope();
container.bind<UserModule>(TYPES.UserModule).to(UserModule).inSingletonScope();

//Stocks Module
container.bind<StocksSandbox>(TYPES.StocksSandbox).to(StocksSandbox).inSingletonScope();
container.bind<StocksModule>(TYPES.StocksModule).to(StocksModule).inSingletonScope();

//Random Module
container.bind<RandomResponses>(TYPES.RandomResponses).to(RandomResponses).inSingletonScope();

//Random Module
container.bind<ManagementModule>(TYPES.ManagementModule).to(ManagementModule).inSingletonScope();
container.bind<ManagementSandbox>(TYPES.ManagementSandbox).to(ManagementSandbox).inSingletonScope();

//Quotes Module
container.bind<QuotesModule>(TYPES.QuotesModule).to(QuotesModule).inSingletonScope();
container.bind<QuotesSandbox>(TYPES.QuotesSandbox).to(QuotesSandbox).inSingletonScope();

export default container;
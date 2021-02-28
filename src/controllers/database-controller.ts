import {injectable} from "inversify"
import {Client, QueryResult} from "pg"
import * as fs from 'fs';
import * as path from 'path'

@injectable()
export class DatabaseController {

    constructor() {

    }

    public dbConnect(): Client {


        let client;

        if (process.env.DATABASE_URL) {
            client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: false
            });
        } else {
            let connection = {
                host: 'localhost',
                user: 'postgres',
                password: 'root',
                database: 'jux-bot-local',
                port: 5432
            }
            client = new Client(connection);
        }


        client.connect();

        return client;
    }

    public async createTables() {
        let db;
        try {
            db = this.dbConnect();
            const query = fs.readFileSync(path.join(__dirname, '../../sql/create-tables.sql')).toString();
            await db.query(query).catch((err) => {console.log(err)});
            console.log('Table is successfully created');
        } catch (err) {
            console.log(err.stack);
        } finally {
            db?.end();
        }
    }

    public async executeQuery(query: string): Promise<QueryResult<any>> {
        let db;
        try {
            db = this.dbConnect();
            return await db.query(query).catch((err) => new Promise<QueryResult<any>>(err));
        } catch (err) {
            console.log(err.stack);
            return new Promise<QueryResult<any>>(err);
        } finally {
            db?.end();
        }


    }

}
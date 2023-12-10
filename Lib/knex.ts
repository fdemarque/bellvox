// import * as pg from "pg";
import {Conf} from "./Conf";
import { knex } from "knex";

export class Knex {

    private static DBInstance;

    static InitDB() {
        return new Promise((Resolve, Reject) => {
            try {
                Knex.DBInstance = knex({
                    client: 'pg',
                    connection: {
                        host: Conf.database.Host,
                        port: Conf.database.Port,
                        user: Conf.database.User,
                        database: Conf.database.Database,
                        password: Conf.database.Password,
                        ssl: false,
                    }
                });
            } catch (E) {
                console.error("Erro inesperado no banco de dados", E);
                Reject(Error);
                process.exit(-1);
            }
        });
    }
    static getConnection() {
        return this.DBInstance;
    }
}

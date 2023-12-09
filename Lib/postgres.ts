import * as pg from "pg";
import * as pg_essential from "pg-essential";
import * as pg_promise from "pg-promise";
import {Conf} from "./Conf";

export class Postgres {

    static PoolConexoes: pg.Pool;
    static Schema;

    static InitDB() {
        return new Promise((Resolve, Reject) => {
            try {

                const _ObjCon = {
                    user: Conf.database.User,
                    host: Conf.database.Host,
                    database: Conf.database.Database,
                    password: Conf.database.Password,
                    port: Conf.database.Port,
                    // Maximo de conexões do pool
                    max: 50,
                    application_name: "Demarque music api",
                };
                Postgres.PoolConexoes = new pg.Pool(_ObjCon);
                pg_essential.patch(pg);
                Postgres.PoolConexoes.on("error", (err, client) => {
                    console.error("Erro inesperado no banco de dados", err);
                    Reject(Error);
                    process.exit(-1);
                });
                Postgres.PoolConexoes.connect().then(Client => {
                    // Testando se a conexão ocorreu com sucesso
                    return Client.query("Select 1").then((Resp) => {
                        console.log("Banco de dados inicializado com sucesso");
                        Client.release();
                        Resolve(this);
                    }).catch(Error => {
                        Client.release();
                        console.error();
                        Reject(Error);
                        // Caso o banco não subiu, mata as conexões
                        process.exit(-1);
                    });
                });
            } catch (E) {
                console.error("Erro inesperado no banco de dados", E);
                Reject(Error);
                process.exit(-1);
            }
        });
    }

    static async DoQuery(Query, Parameters:any[]): Promise<any> {
        return new Promise((Resolve, Reject) => {
           try {
               Postgres.PoolConexoes.connect((Error, Client, Finalizado) => {
                   try {
                       if (Error) {
                           throw Error;
                       }
                       Client.query(Query, Parameters, (Erro, Resp) => {
                          try {
                              if (Erro)
                                  throw Erro;
                              Resolve(Resp.rows);
                          } catch (E) {
                              Reject (E);
                          }
                       });
                   }
                   catch (E) {
                       Reject (E);
                   }
               })
           }
           catch (E) {
               Reject (E);
           }
        });
    }
}

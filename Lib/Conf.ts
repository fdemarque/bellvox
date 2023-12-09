import * as FileSystem from "fs";
import {JWT} from "./jwt";


export class Conf {
    static port;
    static database;
    static jwtpath;


    static Iniciar() {
        // realizando a leitura do arquivo json de parametros da api
        const _ArquivoJSON = JSON.parse(FileSystem.readFileSync("conf/conf.json", "utf8").toString());
        Conf.port = _ArquivoJSON.port;
        Conf.database = _ArquivoJSON.database;
        Conf.jwtpath = _ArquivoJSON.jwtpath;
        JWT.Key = FileSystem.readFileSync(Conf.jwtpath, "utf8").toString();
    }
}

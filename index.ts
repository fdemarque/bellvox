import {Conf} from "./Lib/Conf";
import {HttpExpress} from "./Lib/HttpExpress";
import {LoginApi} from "./Api/LoginApi";
import {Knex} from "./Lib/knex";
import {Crypto} from "./Lib/Crypto";
import {Signup} from "./Api/SignUp";
import {SearchApi} from "./Api/SearchApi";
import {DeleteApi} from "./Api/DeleteApi";
import {InsertApi} from "./Api/InsertApi";
import {UpdateApi} from "./Api/UpdateApi";

class Index {

    static InicializeApi() {
        console.log("Inicializando Api");
        HttpExpress.RegistrarServico(new LoginApi());
        HttpExpress.RegistrarServico(new Signup());
        HttpExpress.RegistrarServico(new SearchApi());
        HttpExpress.RegistrarServico(new DeleteApi());
        HttpExpress.RegistrarServico(new InsertApi());
        HttpExpress.RegistrarServico(new UpdateApi());

        Conf.Iniciar();
        Knex.InitDB();
        Crypto.ToMD5("teste");
        HttpExpress.Inicializar();
    }
}

Index.InicializeApi();


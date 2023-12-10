import {Conf} from "./Lib/Conf";
import {HttpExpress} from "./Lib/HttpExpress";
import {LoginApi} from "./Api/LoginApi";
import {Knex} from "./Lib/knex";
import {Crypto} from "./Lib/Crypto";
import {Signup} from "./Api/SignUp";
import {MusicApi} from "./Api/MusicApi";

class Index {

    static InicializeCaceteDeagulha() {
        console.log("Inicializando Api");
        HttpExpress.RegistrarServico(new LoginApi());
        HttpExpress.RegistrarServico(new Signup());
        HttpExpress.RegistrarServico(new MusicApi());

        Conf.Iniciar();
        Knex.InitDB();
        Crypto.ToMD5("teste");
        HttpExpress.Inicializar();
    }
}

Index.InicializeCaceteDeagulha();


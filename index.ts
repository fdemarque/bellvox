import {Conf} from "./Lib/Conf";
import {HttpExpress} from "./Lib/HttpExpress";
import {LoginApi} from "./Api/LoginApi";
import {SignUp} from "./Api/SignUp";
import {Postgres} from "./Lib/postgres";

class Index {

    static InicializeCaceteDeagulha() {
        console.log("Inicializando Api");
        HttpExpress.RegistrarServico(new LoginApi());
        HttpExpress.RegistrarServico(new SignUp());
        Conf.Iniciar();
        Postgres.InitDB();
        HttpExpress.Inicializar();
    }
}

Index.InicializeCaceteDeagulha();


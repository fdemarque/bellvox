import {ApiClass, TypeMethod} from "./ExpressClass";
import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import {JWT} from "./jwt";
import {MHttpResponse} from "./HttpResponse";
import {Conf} from "./Conf";

export class HttpExpress {

    static Servicos = {};
    static Express;

    static Inicializar() {
        const app = express();
        const server = http.createServer(app);
        HttpExpress.Express = app;
        // Parser para json do body
        app.use(bodyParser.json({limit: '100mb'}));
        // Parser para urlencoded
        app.use(express.urlencoded({extended: true}));
        // Tenta recuperar a primeira parte da string
        for (let _Servico in HttpExpress.Servicos) {
            const Api: ApiClass = HttpExpress.Servicos[_Servico];
            const TipoRequest = Api.Method();
            switch (TipoRequest) {
                case TypeMethod.delete:
                    console.log(`Inicializando ${Api.api()}`)
                    app.delete(Api.api(), (Request, Response) => {
                        HttpExpress.TratamentoRequisicao(Request, Response, Api).then()
                    });
                    break;
                case TypeMethod.get:
                    console.log(`Inicializando ${Api.api()}`)
                    app.get(Api.api(), (Request, Response) => {
                        HttpExpress.TratamentoRequisicao(Request, Response, Api).then()
                    });
                    break;
                case TypeMethod.post:
                    console.log(`Inicializando ${Api.api()}`)
                    app.post(Api.api(), (Request, Response) => {
                        HttpExpress.TratamentoRequisicao(Request, Response, Api).then()
                    });
                    break;
                case TypeMethod.put:
                    console.log(`Inicializando ${Api.api()}`)
                    app.put(Api.api(), (Request, Response) => {
                        HttpExpress.TratamentoRequisicao(Request, Response, Api).then()
                    });
                    break;
            }
        }
        server.listen(Conf.port, () => {
            console.log(`Servidor inicializado corretamente na porta ${Conf.port}`);
        });

    }

    static async TratamentoRequisicao(Request, Response, Api: ApiClass) {
        try {
            const _BodyJson = Request.body;
            let _User
            if (Api.NeedAut()) {
                if (!_BodyJson.JWT)
                    HttpExpress.TratamentoErros(null, Response, -10);
                else {
                    try {
                        _User = await JWT.Validation(_BodyJson.JWT);
                    } catch (E) {
                        HttpExpress.TratamentoErros(null, Response, -10);
                        return;
                    }
                }
            }
            const _Result = await Api.DoRequest(_User, _BodyJson);
            HttpExpress.EnviarRespostaOk(_Result, Response, _BodyJson);
        } catch (E) {
            HttpExpress.TratamentoErros(E, Response)
        }
    }

    static EnviarRespostaOk(Result, Response, Body) {
        try {
            const Resp: MHttpResponse = new MHttpResponse();
            Resp.Status = 0;
            // Verificando download
            Resp.ResultSet = Body && Body.JSON ? Result : JSON.stringify(Result);
            /*let headers = {};
            // IE8 does not allow domains to be specified, just the *
            // headers["Access-Control-Allow-Origin"] = req.headers.origin;
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = true;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "content-type, transaction, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control";*/
            Response.setHeader('Content-type', 'application/json');
            Response.setHeader('Access-Control-Allow-Origin', '*');
            if (Body.CUSTOMBODY)
                Response.json(Resp.ResultSet);
            else
                Response.json(Resp);


        } catch (E) {
            HttpExpress.TratamentoErros(E, Response);
        }
    }

    static TratamentoErros(E, Response, CodigoErro?: number, RetornoOk?: boolean) {
        let _Erro = 'Erro não identificado';
        try {
            if (!CodigoErro) {
                CodigoErro = -1;
                // SE não veio código de retorno, geramos o código genérico
                if (E)
                    _Erro = E.toString();
                // Erro generico
                Response.statusCode = 420;
            } else {
                /**
                 * Erros na faixa de -10 a -20 representam falha na autenticação
                 */
                switch (CodigoErro) {
                    case -10:
                        Response.statusCode = 401;
                        _Erro = 'Usuario não autenticado';
                        break;
                    case -20:
                        Response.statusCode = 403;
                        _Erro = 'Usuario sem permissão de acesso na api';
                        break;
                    default:
                        Response.statusCode = 420;
                        _Erro = E ? E.toString() : _Erro;
                        break;
                }
            }
        } catch (E) {
            Response.statusCode = 400;
        }
        try {
            const ResponseModel = {
                ResultSet: undefined,
                Error: _Erro,
                Status: CodigoErro,
            };
            Response.setHeader('Access-Control-Allow-Origin', '*');
            Response.setHeader('Content-type', 'application/json');
            Response.json(ResponseModel);
            // Response.status(503).send({error: "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n<html><head>\n<title>503 Service Unavailable</title>\n</head><body>\n<h1>Service Unavailable</h1>\n<p>The server is temporarily unable to service your\nrequest due to maintenance downtime or capacity\nproblems. Please try again later.</p>\n<hr>\n<address>Apache/2.4.18 (Ubuntu) Server at api.padariananuvem.com Port 443</address>\n</body></html>\n"});
        } catch (E) {
            console.log(E)
        }
    }

    static RegistrarServico(Requisicao: ApiClass) {
        // Verificando os Serviços
        if (!HttpExpress.Servicos)
            HttpExpress.Servicos = {};
        HttpExpress.Servicos[Requisicao.api()] = Requisicao;
    }


}

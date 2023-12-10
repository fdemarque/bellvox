import { ApiClass, TypeMethod } from "../Lib/ExpressClass";
import { User } from "../Lib/User"
import { Knex } from "../Lib/knex";
import { json } from "express";
import { JWT } from "../Lib/jwt";
import { Crypto } from "../Lib/Crypto";

export class LoginApi extends ApiClass {
    // Método para processar a requisição de login
    async DoRequest(User: User, Request: any): Promise<any> {

        // Obtendo dados de login
        const _Usuario = Request.User;
        const _Password = Request.Password;

        // Consultando o banco de dados para verificar as credenciais
        let _ResultSet = await Knex.getConnection()('users')
            .select('*')
            .where('login', _Usuario)
            .where('password', Crypto.ToMD5(_Password));
        if (!_ResultSet || _ResultSet.length == 0)
            throw "Usuario inválido";
        const _User: User = {
            Login: _ResultSet[0].login,
            Name: _ResultSet[0].username
        }

        // Gerando um token JWT para o usuário autenticado
        const _Token = await JWT.GenerateToken(_User);
        return { "Token": _Token };
    }

    Method(): TypeMethod {
        return TypeMethod.post;
    }

    NeedAut(): boolean {
        return false;
    }

    api(): string {
        return "/login";
    }

}

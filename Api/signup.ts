import {ApiClass, TypeMethod} from "../Lib/ExpressClass";
import {User} from "../Lib/User"
import {Knex} from "../Lib/knex";
import {json} from "express";
import {JWT} from "../Lib/jwt";
import {Crypto} from "../Lib/Crypto";

export class Signup extends ApiClass {
    async DoRequest(User: User, Request: any): Promise<any> {
        console.log(Request);
        const _Usuario = Request.User;
        const _Password = Request.Password;
        const _NomeUsuario = Request.Name;

        if (!_Usuario)
            throw "Usuario não informado"
        if (!_Password)
            throw "Senha não informada"
        if (!_NomeUsuario)
            throw "Nome do usuario nao informado"
        const _Verificacao = await Knex.getConnection()('users').select("*").where("login", _Usuario);
        if (_Verificacao && _Verificacao.length > 0)
            throw "Usuario já existente";
        const _ResultSet = await Knex.getConnection()('users').max("id").first();
        const _Max = _ResultSet.max;
        await Knex.getConnection()('users').insert({
            id : parseInt(_Max) + 1,
            username: _NomeUsuario,
            login : _Usuario,
            password: Crypto.ToMD5(_Password),
            userrole: 2
        })
        return "Usuário cadastrado com sucesso!"
    }

    Method(): TypeMethod {
        return TypeMethod.post;
    }

    NeedAut(): boolean {
        return false;
    }

    api(): string {
        return "/signup";
    }

}

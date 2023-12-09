import {ApiClass, TypeMethod} from "../Lib/ExpressClass";
import {User} from "../Lib/User"
import {Postgres} from "../Lib/postgres";
import {json} from "express";
import {JWT} from "../Lib/jwt";

export class LoginApi extends ApiClass {
    async DoRequest(User: User, Request: any): Promise<any> {
        console.log(Request);
        const _Usuario = Request.User;
        const _Password = Request.Password;
        console.log(_Usuario);
        console.log(_Password);
        let _ResultSet = await Postgres.DoQuery("SELECT * FROM USERS WHERE login = $1 AND password = $2", [_Usuario, _Password]);
        if (!_ResultSet || _ResultSet.length == 0)
            throw "Usuario inválido";
        const _User: User = {
            Login: _ResultSet[0].login,
            Name: _ResultSet[0].username
        }
        const _Token = await JWT.GenerateToken(_User);
        return {"Token" : _Token};
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

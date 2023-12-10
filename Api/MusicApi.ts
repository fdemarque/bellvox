import {ApiClass, TypeMethod} from "../Lib/ExpressClass";
import {User} from "../Lib/User"
import {Knex} from "../Lib/knex";
import {json} from "express";
import {JWT} from "../Lib/jwt";
import {Crypto} from "../Lib/Crypto";

export class MusicApi extends ApiClass {
    async DoRequest(User: User, Request: any): Promise<any> {
        const _NomeMusica = Request.Name;
        const _Page = Request.Page;
        const  _Limit = Request.Limit;
        console.log(_NomeMusica);
        return [{
            Musica: _NomeMusica,
            artista: await Knex.getConnection()('music').select('artista').where('nome', 'ilike', `%${_NomeMusica}%`),
            duracao: await Knex.getConnection()('music').select('duracao').where('nome', 'ilike', `%${_NomeMusica}%`)
        }];        
    }

    Method(): TypeMethod {
        return TypeMethod.get;
    }

    NeedAut(): boolean {
        return true;
    }

    api(): string {
        return "/music";
    }

}

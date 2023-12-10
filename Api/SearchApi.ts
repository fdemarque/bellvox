import {ApiClass, TypeMethod} from "../Lib/ExpressClass";
import {User} from "../Lib/User"
import {Knex} from "../Lib/knex";
import {json} from "express";
import {JWT} from "../Lib/jwt";
import {Crypto} from "../Lib/Crypto";

export class SearchApi extends ApiClass {
    async DoRequest(User: User, Request: any): Promise<any> {        
        const Name = Request.Name;
        const Artista = Request.Artista;  
        const Limit  = Request.Limit ?? 10;
        const Page = Request.Page;
        console.log(Artista);        
        let _Resultado;
        if (Name)
            _Resultado = Knex.getConnection()('music').select('*').where('nome', 'ilike', `%${Name}%`);
        if (Artista) {
            if (_Resultado) {
                _Resultado = _Resultado.where('artista', 'ilike', `%${Artista}%`);
            }            
            else {
                _Resultado = Knex.getConnection()('music').select('*').where('artista', 'ilike', `%${Artista}%`);
            }
        }
        if (_Resultado) {
            _Resultado = await _Resultado;
        }
        else {
            _Resultado = await Knex.getConnection()('music').select('*')
        }            
        console.log(_Resultado)
        // Paginação
        if (Page && _Resultado && _Resultado.length > 0) {
            const _TamanhoPagina = (parseInt(Page)) * parseInt(Limit)                        
            if (_TamanhoPagina > _Resultado.length) {            
               return _Resultado.slice(Limit)
            }
            else {                
                return _Resultado.slice(_TamanhoPagina, _TamanhoPagina + Limit);
            }            
        }
        else if (Limit && _Resultado && _Resultado.length > 0) {
            return _Resultado.slice(0, Limit);
        }
        return _Resultado;
        
    }

    Method(): TypeMethod {
        return TypeMethod.get;
    }

    NeedAut(): boolean {
        return true;
    }

    api(): string {
        return "/search";
    }

}

// Classe wrapper para express

import {User} from "./User";

export abstract class ApiClass {

    // Metodo que vai atender a requisição
    abstract DoRequest(User: User, Request: any): Promise<any>

    // deve retornar o tipo de metodo, se eh get, post, put ou delete
    abstract Method(): TypeMethod;

    // caminho da api ex: /getMusic
    abstract api(): string;

    // Se para consumir essa api, é necessario estar autenticado
    abstract NeedAut(): boolean;

}

export enum TypeMethod {
    get,
    post,
    put,
    delete,
}

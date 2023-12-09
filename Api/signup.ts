import {ApiClass, TypeMethod} from "../Lib/ExpressClass";
import {User} from "../Lib/User"
import {Postgres} from "../Lib/postgres";
import {json} from "express";
import {JWT} from "../Lib/jwt";

export class Signup extends ApiClass {
    
    async DoRequest(User: User, Request: any): Promise<any> {
        // Construir api
        return {
            "resultado" : "cabeçado meupau"
        }
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

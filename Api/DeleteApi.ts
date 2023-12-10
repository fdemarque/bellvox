import { ApiClass, TypeMethod } from "../Lib/ExpressClass";
import { User } from "../Lib/User";
import { Knex } from "../Lib/knex";
import { json } from "express";
import { JWT } from "../Lib/jwt";
import { Crypto } from "../Lib/Crypto";

export class DeleteApi extends ApiClass {
    async DoRequest(user: User, request: any): Promise<any> {

        // Verificando permissão do usuário
        if (user.Userrole != 1){
            throw "Usuario não possui permissao para deletar uma musica";
        }else{
            // Deletando musica com base no id e nome
            const deletedRecords = Knex.getConnection()('music')
                .where("id", "=", request.id)
                .del();
            if (deletedRecords > 0){                  
                return { success: true, message: "Música deletada" };
            }else{
                throw "O id informado não corresponde à uma música"
            }
        }
    }

    Method(): TypeMethod {
        return TypeMethod.delete;
    }

    NeedAut(): boolean {
        return true;
    }

    api(): string {
        return "/delete";
    }
}

import { ApiClass, TypeMethod } from "../Lib/ExpressClass";
import { User } from "../Lib/User";
import { Knex } from "../Lib/knex";
import { json } from "express";
import { JWT } from "../Lib/jwt";
import { Crypto } from "../Lib/Crypto";

export class UpdateApi extends ApiClass {
    async DoRequest(user: User, request: any): Promise<any> {
        
        // Verificando permissão do usuário
        if (user.Userrole != 1){
            throw "Usuario não possui permissao para atualizar um registro";
        }else{
            const { name, artist } = request;
    
            if (!name && !artist) {
                // Se algum dos campos obrigatórios estiver ausente, retorne um erro
                throw "Campos obrigatorios não fornecidos"
            }
    
            const { colunaAtualizar, novoValor } = request;
    
            // Verificando se a música existe antes de tentar atualizar
            const musicExists = await Knex.getConnection()('music')
                .select("*")
                .where("nome", "ilike", `%${name}%`)
                .andWhere("artista", "ilike", `%${artist}%`);
    
            if (musicExists.length === 0) {
                throw "Música não encontrada.";
            }
    
            // Atualizando registro da música
            const updatedRows = await Knex.getConnection()('music')
                .where("nome", "ilike", `%${name}%`)
                .andWhere("artista", "ilike", `%${artist}%`)
                .update({ [colunaAtualizar]: novoValor });
    
            if (updatedRows > 0) {
                return { success: true, message: "Atualização bem-sucedida." };
            } else {
                return { success: false, message: "Nenhuma linha foi atualizada." };
            }
        }
    }

    Method(): TypeMethod {
        return TypeMethod.post;
    }

    NeedAut(): boolean {
        return true;
    }

    api(): string {
        return "/update";
    }
}

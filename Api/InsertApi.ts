import { ApiClass, TypeMethod } from "../Lib/ExpressClass";
import { User } from "../Lib/User";
import { Knex } from "../Lib/knex";
import { json } from "express";
import { JWT } from "../Lib/jwt";
import { Crypto } from "../Lib/Crypto";

export class InsertApi extends ApiClass {
    async DoRequest(user: User, request: any): Promise<any> {
        const { name, artist, duration, id } = request;

        if (!name || !artist || !duration || !id) {
            // Se algum dos campos obrigatórios estiver ausente, retorne um erro
            throw "Campos obrigatorios não fornecidos"
        }

        // Inserindo um novo registro na tabela 'music'
        const insertedRecord = await Knex.getConnection()('music').insert({
            id: id,
            nome: name,
            artista: artist,
            duracao: duration,
        });

        return { success: true, message: "Música adicionada com sucesso" };        
    }

    Method(): TypeMethod {
        return TypeMethod.put;
    }

    NeedAut(): boolean {
        return true;
    }

    api(): string {
        return "/add-music";
    }
}

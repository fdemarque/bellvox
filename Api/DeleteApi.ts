import { ApiClass, TypeMethod } from "../Lib/ExpressClass";
import { User } from "../Lib/User";
import { Knex } from "../Lib/knex";
import { json } from "express";
import { JWT } from "../Lib/jwt";
import { Crypto } from "../Lib/Crypto";

export class DeleteApi extends ApiClass {
    async DoRequest(user: User, request: any): Promise<any> {
        try {
            // Deletando musica com base no id e nome
            const deletedRecords = await Knex.getConnection()('music')
                .where("id", "=", request.id)
                .del();

            if (deletedRecords > 0) {
                return { success: true, message: "Música deletada" };
            } else {
                return { success: false, message: "Música não encontrada" };
            }
        } catch (error) {
            // Lidando com erro
            console.error("Erro ao deletar musica:", error);
            throw error;
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

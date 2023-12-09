import { ApiClass, TypeMethod } from "../Lib/ExpressClass";
import express, { Request, Response } from 'express';
import knex from 'knex';
import { User } from "../Lib/User";
import { json } from "express";
import { JWT } from "../Lib/jwt";

// Define a custom ApiResponse type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export class SearchMusic extends ApiClass {
  private knexInstance: knex;

  constructor() {
    super();
    // Configure Knex here
    this.knexInstance = knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'seu_usuario',
        password: 'sua_senha',
        database: 'seu_banco_de_dados',
      },
    });
  }

  private sendResponse<T>(res: express.Response, data: T, success: boolean = true, message?: string): void {
    const response: ApiResponse<T> = {
      success,
      data,
      message,
    };
    res.json(response);
  }

  async DoRequest(User: User, Request: Request): Promise<Response> {
    try {
      const { id, nome, artista } = Request.query;

      // Construct the query using knex
      const query = this.knexInstance('music')
        .select('*')
        .where((builder) => {
          if (id) builder.where('id', id as string);
          if (nome) builder.orWhere('nome', 'ilike', `%${nome as string}%`);
          if (artista) builder.orWhere('artista', 'ilike', `%${artista as string}%`);
        });

      // Execute the query
      const result = await query;

      this.sendResponse(Request.res, result);

    } catch (error) {
      console.error(error);
      this.sendResponse(Request.res, undefined, false, "Internal server error");
    }
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

import * as jsonwebtoken from "jsonwebtoken";
import {User} from "./User";

export class JWT {

    static Key;

    static async Validation(Token): Promise<User> {
        return new Promise<User>((Resolve, Reject) => {
            try {
                jsonwebtoken.verify(Token, JWT.Key, {algorithms: ['HS512']}, (Err, Decode) => {
                    try {
                        if (Err) {
                            Reject(Err);
                            return;
                        }
                        let _User: User;
                        if (typeof Decode == "string")
                            _User = JSON.parse(Decode);
                        else if (Decode["sub"])
                            _User = JSON.parse(Decode["sub"]);
                        else
                            _User = <User>Decode;
                        if (!_User)
                            throw "Usuario não enviado no token";
                        Resolve(_User);
                    } catch (E) {
                        Reject(E);
                    }
                });
            } catch (E) {
                Reject(E);
            }
        });
    }

    static GenerateToken(User: User): Promise<string> {
        return new Promise((Resolve, Reject) => {
            try {
                let _User = JSON.stringify(User);
                let Opcoes = {
                    algorithm: 'HS512'
                };
                Opcoes["expiresIn"] = "1d";
                _User = JSON.parse(_User);
                // Limpando a propriedade exp para que expiresin funcione
                if (_User["exp"])
                    delete _User["exp"];
                jsonwebtoken.sign(_User,
                    JWT.Key, Opcoes, (Error, Token) => {
                        if (Error)
                            Reject(Error);
                        else {
                            Resolve(Token);
                        }
                    });
            } catch (E) {
                Reject(E);
            }
        });
    }
}

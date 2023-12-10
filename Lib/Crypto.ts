
import * as md5 from 'md5';
import * as crypto from 'crypto';

export class Crypto {
    static FromBase64(String: string) {
        return Buffer.from(String, "base64");
    }

    static ToMD5(String: string) {
        return md5(String);
    }

    static ToMD5Buffer(String): Uint8Array {
        const buf = Buffer.from(String, 'utf-8');

        const hashed = crypto
            .createHash('md5')
            .update(buf)
            .digest();

        return hashed;
    }
}

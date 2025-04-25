// src/hashing.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {  
    async hash(plainText: string): Promise<string> {
        return bcrypt.hash(plainText, 10);
    }

    async compare(
        plainText: string,
        hashedText: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainText, hashedText);
    }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.DB_PROTOCOL}://${process.env.DB_URI}`,{
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            authSource: process.env.DB_ADMIN,
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
})
export class DatabaseModule {}

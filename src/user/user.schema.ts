import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsEmail, IsBoolean, IsNumberString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import {ApiProperty} from "@nestjs/swagger";

@Schema({ validateBeforeSave: true })
export class User {

    @ApiProperty()
    @IsEmail()
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty()
    @IsString()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @IsString()
    @Prop({ required: true })
    surname: string;

    @ApiProperty()
    @IsNumberString()
    @Prop({ required: true, unique: true })
    identification: string;

    @ApiProperty()
    @IsBoolean()
    @Prop({ required: true, default: false })
    isActive: boolean;

    @ApiProperty()
    @IsString()
    @Prop({ required: true })
    password: string;

    @ApiProperty()
    @IsString()
    @Prop({ required: true })
    passwordConfirmation: string;

    @Prop({ required: false })
    _passwordConfirmation: string;

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

export type UserDocument = User & Document;

// Define the schema outside the class
export const UserSchema = SchemaFactory.createForClass(User);


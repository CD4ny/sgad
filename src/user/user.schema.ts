import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsEmail, IsBoolean, IsNumberString, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import {ApiProperty} from "@nestjs/swagger";

@Schema({ validateBeforeSave: true })
export class User {

    @ApiProperty({ description: 'The name of the user' })
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
    lastname: string;

    @IsNumberString()
    @Length(11, 11, { message: 'Your field must be exactly 11 digits long' })
    yourField: string;
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


    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

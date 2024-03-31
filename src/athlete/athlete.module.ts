import { Module } from '@nestjs/common';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Athlete, AthleteSchema } from './schemas/athlete.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Athlete.name, schema: AthleteSchema }]),
  ],
  controllers: [AthleteController],
  providers: [AthleteService],
})
export class AthleteModule {}

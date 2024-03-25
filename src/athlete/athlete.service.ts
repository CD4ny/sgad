import { Injectable } from '@nestjs/common';
import { Athlete, AthleteDocument } from './schemas/athlete.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AthleteService {
  constructor(
    @InjectModel(Athlete.name) private athleteModel: Model<AthleteDocument>,
  ) {}

  async create(athleteData: Partial<Athlete>): Promise<Athlete> {
    const newAthlete = new this.athleteModel(athleteData);
    return newAthlete.save();
  }

  async findAll(): Promise<Athlete[]> {
    return this.athleteModel.find().exec();
  }

  async findOne(id: string): Promise<Athlete> {
    return this.athleteModel.findById(id).exec();
  }

  async update(id: string, athleteData: Partial<Athlete>): Promise<Athlete> {
    return this.athleteModel
      .findByIdAndUpdate(id, athleteData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Athlete> {
    return this.athleteModel.findByIdAndDelete(id).exec();
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async exists(email_id: string): Promise<UserDocument> {
    return this.userModel.findOne({ email:email_id }).exec();
  }

  async create(user: User): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    await this.validateUser(user);
    return newUser.save();
  }

  async update(id: number, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: number): Promise<User> {
    console.log('sed');
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }


/*TODO
*
* */
  async validateUser(user: User): Promise<void> {
    let errorMessage: string = '';

    const identification =
      await this.userModel.exists({ identification: user.identification }).exec().then();
    const email =
      await this.userModel.exists({ email: user.email }).exec();

    if (identification != null || email != null) {
      if (process.env.NODE_ENV !== 'production') {
        errorMessage = 'found conflict in' + identification + 'and ' + email;
      } else {
        errorMessage = 'Conflict';
      }
      throw new BadRequestException(409, errorMessage);
    }
  }

}

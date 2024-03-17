"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(id) {
        return this.userModel.findById(id).exec();
    }
    async exists(email_id) {
        return this.userModel.findOne({ identification: email_id, email: email_id }).exec();
    }
    async create(user) {
        const newUser = new this.userModel(user);
        await this.validateUser(user);
        return newUser.save();
    }
    async update(id, user) {
        return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }
    async remove(id) {
        console.log('sed');
        return this.userModel.findOneAndDelete({ _id: id }).exec();
    }
    async validateUser(user) {
        let errorMessage = 'critic data already exists';
        const identification = await this.userModel.exists({ identification: user.identification }).exec().then();
        const email = await this.userModel.exists({ email: user.email }).exec();
        if (identification != null || email != null) {
            if (process.env.NODE_ENV !== 'production') {
                errorMessage = 'found conflict in' + identification + 'and ' + email;
            }
            else {
                errorMessage = 'Conflict';
            }
            throw new common_1.BadRequestException(409, errorMessage);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
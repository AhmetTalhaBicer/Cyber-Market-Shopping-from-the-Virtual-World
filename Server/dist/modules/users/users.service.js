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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const users_entity_1 = require("./entities/users.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDTO) {
        try {
            const { firstName, lastName, email, password } = userDTO;
            if (!firstName || !lastName || !email || !password) {
                throw new common_1.BadRequestException('All fields are required');
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = this.userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            const savedUser = await this.userRepository.save(newUser);
            delete savedUser.password;
            return savedUser;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('User creation failed');
        }
    }
    async findAll() {
        try {
            return this.userRepository.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch users');
        }
    }
    async findOne(data) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: data.email },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('User retrieval failed');
        }
    }
    async findById(id) {
        try {
            const user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('User retrieval failed');
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            const user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (updateUserDto.email) {
                user.email = updateUserDto.email;
            }
            if (updateUserDto.password) {
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(updateUserDto.password, salt);
            }
            if (updateUserDto.firstName) {
                user.firstName = updateUserDto.firstName;
            }
            if (updateUserDto.lastName) {
                user.lastName = updateUserDto.lastName;
            }
            return this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('User update failed');
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userRepository.remove(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('User deletion failed');
        }
    }
    async deleteAllUsers() {
        try {
            await this.userRepository.delete({});
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete users');
        }
    }
    async updateSecretKey(userId, secret) {
        return this.userRepository.update({ id: userId }, {
            twoFASecret: secret,
            enable2FA: true,
        });
    }
    async disable2FA(userId) {
        return this.userRepository.update({ id: userId }, {
            enable2FA: false,
            twoFASecret: null,
        });
    }
    async createGoogleUser(createGoogleUserDto) {
        let user = await this.userRepository.findOne({
            where: { googleId: createGoogleUserDto.googleId },
        });
        if (!user) {
            user = new users_entity_1.Users();
            user.googleId = createGoogleUserDto.googleId;
            user.email = createGoogleUserDto.email;
            user.firstName = createGoogleUserDto.firstName;
            user.lastName = createGoogleUserDto.lastName;
            await this.userRepository.save(user);
        }
        else {
            throw new common_1.BadRequestException('User already exists');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Users } from './entities/users.entity';
import { LoginDTO } from '../auth/dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateGoogleUserDTO } from './dto/create-userGoogle.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<Users> {
    try {
      const { firstName, lastName, email, password } = userDTO;

      if (!firstName || !lastName || !email || !password) {
        throw new BadRequestException('All fields are required');
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
    } catch (error) {
      throw new InternalServerErrorException('User creation failed');
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(data: LoginDTO): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('User retrieval failed');
    }
  }

  async findById(id: number): Promise<Users> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('User retrieval failed');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new NotFoundException('User not found');
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
    } catch (error) {
      throw new InternalServerErrorException('User update failed');
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException('User deletion failed');
    }
  }

  async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }

  async createGoogleUser(createGoogleUserDto: CreateGoogleUserDTO) {
    // Kullanıcının 'googleId' değerini kullanarak veritabanında arama yap
    let user = await this.userRepository.findOne({
      where: { googleId: createGoogleUserDto.googleId },
    });

    // Eğer kullanıcı bulunamazsa, yeni bir kullanıcı oluştur
    if (!user) {
      user = new Users();
      user.googleId = createGoogleUserDto.googleId;
      user.email = createGoogleUserDto.email;
      user.firstName = createGoogleUserDto.firstName;
      user.lastName = createGoogleUserDto.lastName;
      // Yeni kullanıcıyı veritabanına kaydet
      await this.userRepository.save(user);
    } else {
      throw new BadRequestException('User already exists');
    }

    return user;
  }
}

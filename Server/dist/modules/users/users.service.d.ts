import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { Users } from './entities/users.entity';
import { LoginDTO } from '../auth/dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateGoogleUserDTO } from './dto/create-userGoogle.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    create(userDTO: CreateUserDTO): Promise<Users>;
    findAll(): Promise<Users[]>;
    findOne(data: LoginDTO): Promise<Users>;
    findById(id: number): Promise<Users>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users>;
    deleteUser(id: number): Promise<void>;
    deleteAllUsers(): Promise<void>;
    updateSecretKey(userId: any, secret: string): Promise<UpdateResult>;
    disable2FA(userId: number): Promise<UpdateResult>;
    createGoogleUser(createGoogleUserDto: CreateGoogleUserDTO): Promise<Users>;
}

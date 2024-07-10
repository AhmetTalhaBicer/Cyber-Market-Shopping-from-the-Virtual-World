import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        result?: Users[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        result?: Users[];
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        result?: Users[];
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAll(): Promise<{
        success: boolean;
        message: string;
    }>;
}

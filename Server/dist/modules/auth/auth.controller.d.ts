import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { Users } from '../users/entities/users.entity';
import { Enable2FAType } from './types/types';
import { UpdateResult } from 'typeorm';
import { ValidateTokenDTO } from './dto/validate-token.dto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    signup(userDTO: CreateUserDTO): Promise<Users>;
    login(loginDTO: LoginDTO): Promise<{
        accessToken: string;
    } | {
        validate2FA: string;
        message: string;
    }>;
    enable2FA(req: any): Promise<Enable2FAType>;
    validate2FA(req: any, ValidateTokenDTO: ValidateTokenDTO): Promise<{
        verified: boolean;
    }>;
    disable2FA(req: any): Promise<UpdateResult>;
    getUserData(access_token: string): Promise<void>;
    authorizeUser(res: any): Promise<void>;
    oauthCallback(code: string, res: any): Promise<void>;
}

import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateResult } from 'typeorm';
import { Enable2FAType } from './types/types';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(loginDTO: LoginDTO): Promise<{
        accessToken: string;
    } | {
        validate2FA: string;
        message: string;
    }>;
    enable2FA(userId: number): Promise<Enable2FAType>;
    validate2FAToken(userId: number, validateCode: string): Promise<{
        verified: boolean;
    }>;
    disable2FA(userId: number): Promise<UpdateResult>;
    getUserData(access_token: string): Promise<any>;
    googleLogin(code: string): Promise<any>;
}

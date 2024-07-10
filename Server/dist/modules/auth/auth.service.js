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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const speakeasy = require("speakeasy");
const google_auth_library_1 = require("google-auth-library");
const create_userGoogle_dto_1 = require("../users/dto/create-userGoogle.dto");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(loginDTO) {
        const user = await this.userService.findOne(loginDTO);
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);
        if (passwordMatched) {
            delete user.password;
            const payload = { email: user.email, userId: user.id };
            if (user.enable2FA && user.twoFASecret) {
                return {
                    validate2FA: 'http://localhost:3000/auth/validate-2fa',
                    message: 'Please sends the one time password/token from your Google Authenticator App',
                };
            }
            return {
                accessToken: this.jwtService.sign(payload),
            };
        }
        else {
            throw new common_1.UnauthorizedException('Password does not match');
        }
    }
    async enable2FA(userId) {
        const user = await this.userService.findById(userId);
        if (user.enable2FA) {
            return { secret: user.twoFASecret };
        }
        const secret = speakeasy.generateSecret();
        console.log(secret);
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret);
        return { secret: user.twoFASecret };
    }
    async validate2FAToken(userId, validateCode) {
        try {
            const user = await this.userService.findById(userId);
            const verified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                token: validateCode,
                encoding: 'base32',
            });
            if (verified) {
                return { verified: true };
            }
            else {
                return { verified: false };
            }
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Error verifying token');
        }
    }
    async disable2FA(userId) {
        return this.userService.disable2FA(userId);
    }
    async getUserData(access_token) {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        return data;
    }
    async googleLogin(code) {
        try {
            const redirectURL = 'http://localhost:3000/auth/google/callback';
            const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectURL);
            const response = await oAuth2Client.getToken(code);
            await oAuth2Client.setCredentials(response.tokens);
            const user = oAuth2Client.credentials;
            console.log('******credentials*******', user);
            const userData = await this.getUserData(oAuth2Client.credentials.access_token);
            console.log('******userData*******', userData);
            const createGoogleUserDto = new create_userGoogle_dto_1.CreateGoogleUserDTO();
            createGoogleUserDto.googleId = userData.sub;
            createGoogleUserDto.email = userData.email;
            createGoogleUserDto.firstName = userData.given_name;
            createGoogleUserDto.lastName = userData.family_name;
            const savedUser = await this.userService.createGoogleUser(createGoogleUserDto);
            return savedUser;
        }
        catch (err) {
            console.log('Error logging in with OAuth2 user', err);
            throw new common_1.UnauthorizedException('Error logging in with OAuth2 user');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
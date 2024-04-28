import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateResult } from 'typeorm';
import { Enable2FAType, PayloadType } from './types/types';
import * as speakeasy from 'speakeasy';
import { OAuth2Client } from 'google-auth-library';
import { CreateGoogleUserDTO } from '../users/dto/create-userGoogle.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDTO: LoginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      if (user.enable2FA && user.twoFASecret) {
        return {
          validate2FA: 'http://localhost:3000/auth/validate-2fa',
          message:
            'Please sends the one time password/token from your Google Authenticator App',
        };
      }
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match'); // 5.
    }
  }
  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId); //1
    if (user.enable2FA) {
      //2
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret(); //3
    console.log(secret);
    user.twoFASecret = secret.base32; //4
    await this.userService.updateSecretKey(user.id, user.twoFASecret); //5
    return { secret: user.twoFASecret }; //6
  }

  async validate2FAToken(
    userId: number,
    validateCode: string,
  ): Promise<{ verified: boolean }> {
    try {
      // find the user on the based on id
      const user = await this.userService.findById(userId);

      // extract his 2FA secret

      // verify the secret with token by calling the speakeasy verify method
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: validateCode,
        encoding: 'base32',
      });

      // if validated then sends the json web token in the response
      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      throw new UnauthorizedException('Error verifying token');
    }
  }
  // disable 2FA
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }

  async getUserData(access_token: string) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    );

    const data = await response.json();
    return data;
  }

  async googleLogin(code: string): Promise<any> {
    try {
      const redirectURL = 'http://localhost:3000/auth/google/callback';
      const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectURL,
      );
      const response = await oAuth2Client.getToken(code);
      await oAuth2Client.setCredentials(response.tokens);
      const user = oAuth2Client.credentials;
      console.log('******credentials*******', user);
      const userData = await this.getUserData(
        oAuth2Client.credentials.access_token,
      );
      console.log('******userData*******', userData);

      const createGoogleUserDto = new CreateGoogleUserDTO();
      createGoogleUserDto.googleId = userData.sub;
      createGoogleUserDto.email = userData.email;
      createGoogleUserDto.firstName = userData.given_name;
      createGoogleUserDto.lastName = userData.family_name;

      const savedUser =
        await this.userService.createGoogleUser(createGoogleUserDto);
      return savedUser;
    } catch (err) {
      console.log('Error logging in with OAuth2 user', err);
      throw new UnauthorizedException('Error logging in with OAuth2 user');
    }
  }
}

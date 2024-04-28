import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { Users } from '../users/entities/users.entity';
import { Enable2FAType } from './types/types';
import { UpdateResult } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { JwtAuthGuard } from './Jwt/jwt-guard';
import { OAuth2Client } from 'google-auth-library';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  //Signup
  @Post('signup')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in the response',
  })
  @ApiBody({ type: CreateUserDTO })
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<Users> {
    return this.userService.create(userDTO);
  }

  //Login
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
  @ApiBody({ type: LoginDTO })
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }

  //Enable 2FA
  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(
    @Req()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  //Validate 2FA
  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Req()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }
  //Disable 2FA
  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Req()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  //Google Login
  async getUserData(access_token: string) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    );

    //console.log('response',response);
    const data = await response.json();
    console.log('data', data);
  }

  @Post('google/authorize')
  async authorizeUser(@Res() res): Promise<void> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    const redirectURL = 'http://localhost:3000/auth/google/callback';

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectURL,
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
      ],
      prompt: 'consent',
    });
    res.json({ url: authorizeUrl });
  }

  @Get('google/callback')
  async oauthCallback(@Query('code') code: string, @Res() res): Promise<void> {
    try {
      const userData = await this.authService.googleLogin(code);
      // Kullanıcı verilerini burada kullan
      console.log('*****User Data******', userData);
    } catch (err) {
      console.log('Error handling OAuth2 callback', err);
      throw new UnauthorizedException('Error handling OAuth2 callback');
    }
    res.redirect('http://localhost:5173/');
  }
}

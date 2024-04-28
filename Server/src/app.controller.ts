import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/Jwt/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request,
  ) {
    return request.user;
  }
}

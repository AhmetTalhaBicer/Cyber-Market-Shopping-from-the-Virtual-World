import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleUserDTO {
  @IsString()
  @IsNotEmpty()
  googleId: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

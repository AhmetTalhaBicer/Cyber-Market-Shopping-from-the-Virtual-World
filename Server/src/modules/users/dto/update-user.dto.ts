import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;
}

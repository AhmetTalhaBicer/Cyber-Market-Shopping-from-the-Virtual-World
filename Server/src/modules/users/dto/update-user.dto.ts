import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

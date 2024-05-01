import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  image_url?: string;
}

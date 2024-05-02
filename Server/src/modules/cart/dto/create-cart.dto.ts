import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @ApiProperty({ example: 130 })
  userId: number;

  @ApiProperty({
    example: [
      {
        productId: 101,
        quantity: 10,
      },
    ],
  })
  items: Array<{ productId: number; quantity: number }>;
}

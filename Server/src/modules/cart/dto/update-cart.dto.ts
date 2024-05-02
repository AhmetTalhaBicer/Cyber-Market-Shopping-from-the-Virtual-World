import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(
  OmitType(CreateCartDto, ['userId']),
) {}

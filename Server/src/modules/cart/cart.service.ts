import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Cart } from './entities/cart.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private usersService: UsersService,
    private productService: ProductService,
  ) {}

  // Create a new cart
  async create(createCartDto: CreateCartDto) {
    const user = await this.usersService.findById(createCartDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with id ${createCartDto.userId} not found`,
      );
    }
    const totalPrice = await this.calculateTotalPrice(createCartDto.items);
    const newCart = this.cartRepository.create({
      ...createCartDto,
      total: totalPrice,
      user: user,
    });

    const savedCart = await this.cartRepository.save(newCart);
    return savedCart;
  }

  async calculateTotalPrice(items: { productId: number; quantity: number }[]) {
    let totalPrice = 0;
    for (const item of items) {
      const product = await this.productService.findById(item.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }
      totalPrice += product.price * item.quantity;
    }
    return totalPrice;
  }

  // Get all carts
  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }

  // Get a cart by id
  async findById(cart_id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id },
    });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    return cart;
  }

  // Get carts by user
  async findByUser(user_id: number): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: { user: { id: user_id } },
    });
  }

  // Update a cart
  async update(cart_id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.findById(cart_id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    const updatedCart = { ...cart, ...updateCartDto };
    return await this.cartRepository.save(updatedCart);
  }

  // Delete a cart
  async remove(cart_id: number) {
    const cart = await this.findById(cart_id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    return await this.cartRepository.remove(cart);
  }

  // Delete all carts
  async removeAll() {
    return await this.cartRepository.delete({});
  }

  // Add item to cart
  async addItem(
    cart_id: number,
    item: { productId: number; quantity: number },
  ) {
    const cart = await this.findById(cart_id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    cart.items.push(item);
    await this.cartRepository.save(cart);
    return await this.calculateTotal(cart_id);
  }

  // Remove item from cart
  async removeItem(cart_id: number, item_id: number) {
    const cart = await this.findById(cart_id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    cart.items = cart.items.filter((item) => item.productId !== item_id);
    await this.cartRepository.save(cart);
    return await this.calculateTotal(cart_id);
  }

  // Clear cart
  async clear(cart_id: number) {
    const cart = await this.findById(cart_id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    cart.items = [];
    return await this.cartRepository.save(cart);
  }

  // Calculate total
  async calculateTotal(cart_id: number) {
    const cart = await this.findById(cart_id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${cart_id} not found`);
    }
    let total = 0;
    cart.items.forEach((item) => {
      total += item.quantity * item.productId;
    });
    cart.total = total;
    return await this.cartRepository.save(cart);
  }
}

@Injectable()
export class CartValidationPipe implements PipeTransform {
  transform(value: any) {
    const requiredFields = ['userId', 'items'];

    const fieldTypes = {
      userId: 'number',
      items: 'object',
    };

    requiredFields.forEach((field) => {
      if (!value[field]) {
        throw new BadRequestException(`${field} is required`);
      }

      if (typeof value[field] !== fieldTypes[field]) {
        throw new BadRequestException(
          `${field} must be a ${fieldTypes[field]}`,
        );
      }
    });

    if (!Array.isArray(value.items)) {
      throw new BadRequestException('Items must be an array');
    }

    value.items.forEach((item) => {
      if (
        typeof item.productId !== 'number' ||
        typeof item.quantity !== 'number'
      ) {
        throw new BadRequestException(
          'Each item must have a productId and quantity of type number',
        );
      }
    });

    return value;
  }
}

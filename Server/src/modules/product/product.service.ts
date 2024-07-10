import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryService: CategoryService,
  ) {}

  // Create a new product
  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findById(
      createProductDto.category_id,
    );
    if (!category) {
      throw new NotFoundException(
        `Category with id ${createProductDto.category_id} not found`,
      );
    }
    const newProduct = this.productRepository.create(createProductDto);
    newProduct.category = category;
    return await this.productRepository.save(newProduct);
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Get a product by id
  async findById(product_id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { product_id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${product_id} not found`);
    }
    return product;
  }

  // Get products by category
  async findByCategory(category_id: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category: { category_id } },
    });
  }

  // Update a product
  async update(product_id: number, updateProductDto: UpdateProductDto) {
    const updateResult = await this.productRepository.update(
      product_id,
      updateProductDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Product with id ${product_id} not found`);
    }
    return updateResult;
  }

  // Delete a product
  async remove(product_id: number) {
    const deleteResult = await this.productRepository.delete(product_id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Product with id ${product_id} not found`);
    }
    return deleteResult;
  }

  // Delete products by category id
  async removeByCategoryId(category_id: number) {
    return await this.productRepository
      .createQueryBuilder()
      .delete()
      .where('category_id = :category_id', { category_id })
      .execute();
  }

  //Delete all products
  async removeAll() {
    return await this.productRepository.delete({});
  }
}

@Injectable()
export class CategoryValidationPipe implements PipeTransform {
  transform(value: any) {
    const requiredFields = [
      'name',
      'description',
      'price',
      'quantity',
      'image_url',
      'category_id',
    ];

    const fieldTypes = {
      name: 'string',
      description: 'string',
      price: 'number',
      quantity: 'number',
      image_url: 'string',
      category_id: 'number',
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

    if (value.price <= 0) {
      throw new BadRequestException('Price must be a positive number');
    }

    if (value.quantity < 0) {
      throw new BadRequestException('Quantity must be a non-negative number');
    }

    return value;
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findById(category_id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }
    return category;
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateResult = await this.categoryRepository.update(
      category_id,
      updateCategoryDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }
    return updateResult;
  }

  async remove(category_id: number) {
    const deleteResult = await this.categoryRepository.delete(category_id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }
    return deleteResult;
  }
}

@Injectable()
export class CategoryValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.name) {
      throw new BadRequestException('Category name is required');
    }
    return value;
  }
}

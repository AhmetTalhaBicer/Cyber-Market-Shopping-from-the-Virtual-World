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

  // Create a new category
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Get a category by id
  async findById(category_id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }
    return category;
  }

  // Update a category
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

  // Delete a category
  async remove(category_id: number) {
    const deleteResult = await this.categoryRepository.delete(category_id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }
    return deleteResult;
  }

  //Delete all categories
  async removeAll() {
    return await this.categoryRepository.delete({});
  }
}

@Injectable()
export class CategoryValidationPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(value: any) {
    const requiredFields = ['name', 'image_url'];

    const fieldTypes = {
      name: 'string',
      image_url: 'string',
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

    return value;
  }
}

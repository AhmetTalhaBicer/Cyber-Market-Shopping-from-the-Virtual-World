import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpExceptionFilter } from 'src/utils/HttpExceptionFilter';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @Post()
  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return {
        success: true,
        message: 'Category created successfully',
        result: newCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create category',
        error: error.message,
      };
    }
  }
  // Get all categories
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return {
        success: true,
        message: 'All categories retrieved successfully.',
        result: categories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve categories',
        error: error.message,
      };
    }
  }

  // Get category by id
  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of category to find',
  })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseFilters(new HttpExceptionFilter())
  async findById(@Param('id') id: number) {
    try {
      const category = await this.categoryService.findById(id);
      return {
        success: true,
        message: 'Category retrieved successfully.',
        result: category,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve category',
        error: error.message,
      };
    }
  }

  // Update category
  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of category to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
      );
      return {
        success: true,
        message: 'Category updated successfully',
        result: updatedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update category',
        error: error.message,
      };
    }
  }

  // Delete category
  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of category to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('id') id: number) {
    try {
      const deletedCategory = await this.categoryService.remove(id);
      return {
        success: true,
        message: 'Category deleted successfully',
        result: deletedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete category',
        error: error.message,
      };
    }
  }

  // Delete all categories
  @Delete()
  @ApiOperation({ summary: 'Delete all categories' })
  @ApiResponse({
    status: 200,
    description: 'All categories have been successfully deleted.',
  })
  @UseFilters(new HttpExceptionFilter())
  async removeAll() {
    try {
      const deletedCategories = await this.categoryService.removeAll();
      return {
        success: true,
        message: 'All categories deleted successfully',
        result: deletedCategories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete categories',
        error: error.message,
      };
    }
  }
}

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
    const newCategory = await this.categoryService.create(createCategoryDto);
    return {
      success: true,
      message: 'Category created successfully',
      category: newCategory,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    const category = await this.categoryService.findAll();
    return {
      success: true,
      message: 'All categories retrieved successfully.',
      category,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of category to find',
  })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseFilters(new HttpExceptionFilter())
  async findById(@Param('id') id: number) {
    const category = await this.categoryService.findById(id);
    return {
      success: true,
      message: 'Category retrieved successfully.',
      category,
    };
  }

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
    const updatedCategory = await this.categoryService.update(
      id,
      updateCategoryDto,
    );
    return {
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory,
    };
  }

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
    await this.categoryService.remove(id);
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
}

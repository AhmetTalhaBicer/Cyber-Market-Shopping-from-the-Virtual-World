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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/HttpExceptionFilter';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  @ApiOperation({
    summary: 'Create product',
    description: 'Create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productService.create(createProductDto);
      return {
        success: true,
        message: 'Product created successfully',
        product: newProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create product',
        error: error.message,
      };
    }
  }

  // Get all products
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async findAll() {
    try {
      const product = await this.productService.findAll();
      return {
        success: true,
        message: 'All products retrieved successfully.',
        product,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve products',
        error: error.message,
      };
    }
  }

  // Get product by id
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findById(+id);
      return {
        success: true,
        message: 'Product retrieved successfully.',
        product,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve product',
        error: error.message,
      };
    }
  }

  // Get products by category
  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiResponse({ status: 200, description: 'Return the products.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async findByCategory(@Param('categoryId') categoryId: string) {
    try {
      const products = await this.productService.findByCategory(+categoryId);
      return {
        success: true,
        message: 'Products retrieved successfully.',
        products,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve products',
        error: error.message,
      };
    }
  }

  // Update a product
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productService.update(
        +id,
        updateProductDto,
      );
      return {
        success: true,
        message: 'Product updated successfully.',
        updatedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update product',
        error: error.message,
      };
    }
  }

  // Delete a product
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('id') id: string) {
    try {
      const deletedProduct = await this.productService.remove(+id);
      return {
        success: true,
        message: 'Product deleted successfully.',
        deletedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete product',
        error: error.message,
      };
    }
  }

  // Delete all products
  @Delete()
  @ApiOperation({ summary: 'Delete all products' })
  @ApiResponse({
    status: 200,
    description: 'All products have been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseFilters(new HttpExceptionFilter())
  async removeAll() {
    try {
      const deletedProducts = await this.productService.removeAll();
      return {
        success: true,
        message: 'All products deleted successfully.',
        deletedProducts,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete products',
        error: error.message,
      };
    }
  }
}

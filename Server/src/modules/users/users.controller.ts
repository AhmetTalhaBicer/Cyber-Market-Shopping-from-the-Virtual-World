import {
  Body,
  Get,
  Param,
  HttpStatus,
  Controller,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All users retrieved successfully.',
    type: Users,
    isArray: true,
  })
  async findAll(): Promise<{
    success: boolean;
    message: string;
    users?: Users[];
  }> {
    try {
      const users = await this.usersService.findAll();
      return {
        success: true,
        message: 'All users retrieved successfully.',
        users,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Find a user by ID
  @Get(':id')
  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully.',
    type: Users,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async findOne(
    @Param('id') id: number,
  ): Promise<{ success: boolean; message: string; user?: Users }> {
    try {
      const user = await this.usersService.findById(id);
      return {
        success: true,
        message: 'User retrieved successfully.',
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Update a user
  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully.',
    type: Users,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean; message: string; user?: Users }> {
    try {
      const user = await this.usersService.updateUser(id, updateUserDto);
      return {
        success: true,
        message: 'User updated successfully.',
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Delete a user
  @Delete(':id') // Değişiklik burada
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async delete(
    @Param('id') id: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.usersService.deleteUser(id);
      return {
        success: true,
        message: 'User deleted successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

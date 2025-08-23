import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus, 
  ConflictException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      // Don't return password in response
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL duplicate key error
        throw new ConflictException('User with this email already exists');
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Could not create user');
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      // Remove passwords from response
      return users.map(user => {
        const { password, ...result } = user;
        return result;
      });
    } catch (error) {
      throw new BadRequestException('Could not fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException('Could not fetch user');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new NotFoundException('User not found');
      }
      if (error.code === '23505') { // PostgreSQL duplicate key error
        throw new ConflictException('User with this email already exists');
      }
      throw new BadRequestException('Could not update user');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
    } catch (error) {
      if (error.message === 'User not found') {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException('Could not delete user');
    }
  }
}
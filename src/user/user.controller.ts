import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
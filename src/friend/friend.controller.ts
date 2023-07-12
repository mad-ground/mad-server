import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FriendService } from './friend.service';
import { Friend } from './friend.entity';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  async findAll(): Promise<Friend[]> {
    return this.friendService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Friend> {
    return this.friendService.findOne(id);
  }

  @Post()
  async create(@Body() friend: Friend): Promise<Friend> {
    return this.friendService.create(friend.name, friend.users);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.friendService.delete(id);
  }
}

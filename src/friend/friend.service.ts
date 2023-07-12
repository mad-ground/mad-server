import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './friend.entity';
import { User } from '../user/user.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
  ) {}

  async findAll(): Promise<Friend[]> {
    return await this.friendRepository.find();
  }

  async findOne(id: number): Promise<Friend> {
    return await this.friendRepository.findOne({ where: { id } });
  }

  async create(name: string, users: User[]): Promise<Friend> {
    const friend = new Friend();
    friend.name = name;
    friend.users = users;
    return await this.friendRepository.save(friend);
  }

  async delete(id: number): Promise<void> {
    const friend = await this.friendRepository.findOne({ where: { id } });
    await this.friendRepository.remove(friend);
  }
}

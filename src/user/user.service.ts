import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './dto/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { deletedAt: null },
    });
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findUser(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async create(user: UserInput): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: UserInput): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      user.deletedAt = new Date();
      await this.userRepository.save(user);
    }
  }
}

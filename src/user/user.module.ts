import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FriendModule } from '../friend/friend.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FriendModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

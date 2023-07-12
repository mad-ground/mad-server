import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { RoomModule } from '../room/room.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), RoomModule],
  controllers: [InvitationController],
  providers: [InvitationService, UserService],
})
export class InvitationModule {}

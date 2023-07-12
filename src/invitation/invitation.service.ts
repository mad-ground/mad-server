import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    private roomService: RoomService,
    private userService: UserService,
  ) {}

  async createInvitation(inviterId: number, inviteeId: number, roomId: number): Promise<Invitation> {
    const inviter = await this.userService.findUserById(inviterId);
    const invitee = await this.userService.findUserById(inviteeId);
    const room = await this.roomService.findRoomById(roomId);
    const invitation = new Invitation();
    invitation.inviter = inviter;
    invitation.invitee = invitee;
    invitation.room = room;
    return await this.invitationRepository.save(invitation);
  }

  async acceptInvitation(invitationId: number): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({ where: { id: invitationId } });
    if (!invitation) {
      throw new Error('Invitation not found');
    }
    invitation.accepted = true;
    invitation.invitee.room = invitation.room;
    await this.userService.update(invitation.invitee.id, invitation.invitee);
    return await this.invitationRepository.save(invitation);
  }

  async deleteInvitation(invitationId: number): Promise<void> {
    const invitation = await this.invitationRepository.findOne({ where: { id: invitationId } });
    if (invitation) {
      await this.invitationRepository.remove(invitation);
    }
  }
}

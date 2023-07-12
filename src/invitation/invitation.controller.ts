import { Controller, Post, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvitationService } from './invitation.service';


@Controller('invitation')
@ApiTags('Invitation')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class InvitationController {
  constructor(private invitationService: InvitationService) {}

  @Post('create/:inviteeId/:roomId')
  async createInvitation(
    @Req() inviterId: number,
    @Param('inviteeId') inviteeId: number,
    @Param('roomId') roomId: number,
  ) {
    return this.invitationService.createInvitation(inviterId, inviteeId, roomId);
  }
  //방에 현재 유저(inviter의 아이디) 와 초대된사람의 유저(invitee의 아이디)와 룸의 아이디가 있으면 초대되도록 

  @Post('accept/:invitationId')
  async acceptInvitation(@Param('invitationId') invitationId: number) {
    return this.invitationService.acceptInvitation(invitationId);
  }
  //초대 수락

  @Delete('delete/:invitationId')
  async deleteInvitation(@Param('invitationId') invitationId: number) {
    return this.invitationService.deleteInvitation(invitationId);
  }
  //초대 거절
}



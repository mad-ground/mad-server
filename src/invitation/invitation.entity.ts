import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  inviter: User;

  @ManyToOne(() => User, { nullable: false })
  invitee: User;

  @ManyToOne(() => Room, { nullable: false })
  room: Room;

  @Column({ default: false })
  accepted: boolean;
}

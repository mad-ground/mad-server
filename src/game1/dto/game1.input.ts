import { ApiProperty } from '@nestjs/swagger';

//dto -> 데이터 전송을 위해 사용되는 객체 
export class Game1Input {
  @ApiProperty({ type: String, description: '유저 ID' })
  username: string;
  @ApiProperty({ type: String, description: '비밀번호' })
  password: string;
  @ApiProperty({ type: String, description: '유저명' })
  name: string;
  @ApiProperty({ type: String, description: '이메일' })
  email: string;
  @ApiProperty({ type: String, description: '프로필 이미지' })
  profileImage: string;
}
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: '账号',
    default: 'zs',
  })
  userName: string;
  @ApiProperty({
    description: '密码',
    default: 'a123456',
  })
  passWord: string;
}

export class LoginDTO extends UserDTO {}

export class RegisterDTO extends UserDTO {
  @ApiProperty({
    description: '用户名',
    default: 'chengzg',
    type: String,
  })
  nickName: string;
}

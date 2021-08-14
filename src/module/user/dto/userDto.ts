import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty({ message: '姓名不能为空' })
  nickName: string;
}

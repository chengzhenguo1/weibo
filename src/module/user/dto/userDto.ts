import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: '账号',
    default: 'zs',
  })
  @IsNotEmpty({ message: '账号不能为空' })
  userName: string;

  @ApiProperty({
    description: '密码',
    default: 'a123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  passWord: string;
}

export class LoginDto extends UserDto {}

export class RegisterDto extends UserDto {
  @ApiProperty({
    description: '用户名',
    default: 'chengzg',
    type: String,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  nickName: string;

  @ApiProperty({
    description: '重复密码',
    type: String,
  })
  @IsNotEmpty({ message: '重复密码不能为空' })
  cPassWord: string;
}

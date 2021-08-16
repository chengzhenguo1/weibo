import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { Role } from 'src/shared/enum/role.enum';
import { RbacGuard } from 'src/shared/guard/rbac.guard';
import { ResponseRO } from 'src/shared/interface/response.interface';
import { AuthService } from '../auth/auth.service';
import { LoginDto, RegisterDto } from './dto/userDto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<ResponseRO> {
    try {
      const res = await this.userService.createUser(body);

      if (res) {
        return {
          code: 200,
          data: {
            user: res,
          },
          message: '注册成功',
        };
      } else {
        return {
          code: 400,
          message: '注册失败',
        };
      }
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }

  @Post('login')
  async login(@Body() loginParmas: LoginDto): Promise<ResponseRO> {
    console.log('JWT验证 - Step 1: 用户请求登录');

    const authResult = await this.authService.validateUser(
      loginParmas.userName,
      loginParmas.passWord,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 400,
          message: `账号或密码不正确`,
        };
      default:
        return {
          code: 400,
          message: `查无此人`,
        };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RbacGuard)
  @Roles(Role.User)
  @Post('getUserInfo')
  async getUserInfo(@Body('userName') userName: string): Promise<ResponseRO> {
    const user = await this.userService.getUserInfo(userName);
    if (user) {
      return {
        code: 200,
        data: user,
        message: '获取成功',
      };
    } else {
      return {
        code: 400,
        message: '获取失败',
      };
    }
  }
}

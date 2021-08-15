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
      const res = this.userService.register(body) as any;
      return res;
    } catch (error) {
      return {
        statusCode: 400,
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
          statusCode: 400,
          message: `账号或密码不正确`,
        };
      default:
        return {
          statusCode: 400,
          message: `查无此人`,
        };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @Post('findOne')
  async findOne(@Body('userName') userName: any) {
    return this.userService.findOne(userName);
  }
}

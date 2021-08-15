// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/shared/utils/cryptogram';
import { ResponseRO } from 'src/shared/interface/response.interface';
import { UserEntity } from '../user/user.entity';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly clientDefault: Redis,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ code: number; user: UserEntity }> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.usersService.findOne(username);
    if (user) {
      const hashedPassword = user.passWord;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: UserEntity): Promise<ResponseRO> {
    console.log(user);
    const payload = {
      id: user.id,
      userName: user.userName,
      nickName: user.nickName,
      role: user.role,
    };

    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      // 存储TOKEN
      this.clientDefault.set(
        `${user.id}-${user.userName}`,
        `${token}`,
        'EX',
        30,
      );

      console.log(token);
      return {
        statusCode: 200,
        data: {
          token,
        },
        success: true,
        message: `登录成功`,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        success: false,
        message: `账号或密码错误`,
      };
    }
  }
}

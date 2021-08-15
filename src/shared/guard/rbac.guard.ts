import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';
import { Role } from 'src/module/user/user.entity';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly clientDefault: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    // const user = request.user;
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1]; // authorization: Bearer xxx

    if (!requireRoles) {
      return true;
    }

    // 当前角色
    const user = {
      roles: ['admin', 'user'],
      id: 3,
      userName: 'a123456',
    };

    const key = `${user.id}-${user.userName}`;
    const cache = await this.clientDefault.get(key);

    if (token !== cache) {
      // 如果 token 不匹配，禁止访问
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }

    if (!requireRoles.some((role) => user?.roles?.includes(role))) {
      throw new UnauthorizedException('您无此权限');
    }

    return true;
  }
}

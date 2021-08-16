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
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly clientDefault: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const authorization = request['headers'].authorization || void 0;
    const token = authorization?.split(' ')[1]; // authorization: Bearer xxx
    const userName = request['headers'].username;

    if (!requireRoles) {
      return true;
    }

    const key = userName;
    const user = JSON.parse(await this.clientDefault.get(key));
    // 如果 token 不匹配，禁止访问
    if (token !== user?.token) {
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }

    if (!requireRoles.includes(user?.role)) {
      throw new UnauthorizedException('您无此权限');
    }

    return true;
  }
}

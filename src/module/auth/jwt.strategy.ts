import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { jwtConstants } from './constats';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: UserEntity) {
    console.log(`JWT验证 - Step 4: 被守卫调用`,{payload});
    return {
      id: payload.id,
      userName: payload.userName,
      passWord: payload.passWord,
      nickName: payload.nickName,
      role: payload.role,
    };
    
  }
}

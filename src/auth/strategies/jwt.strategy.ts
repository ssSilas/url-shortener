import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import config from 'helpers/db/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().secretKey,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.data.id,
      email: payload.data.email,
    };
  }
}

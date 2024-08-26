import config from 'config/db/config';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserDto, UserDataForTokenDto } from 'helpers/dto/user.dto';
import { PROVIDERS } from 'config/providers';

@Injectable()
export class Tokengenerate {
  constructor(private readonly jwtService: JwtService) {}

  async tokenGenerate(user: UserDataForTokenDto, server: string) {
    const secretKey: string = config().secretKey;

    const duration_token_web: string = config().durationToken; //hours : minutes
    const duration: string = duration_token_web;
    const date = Date.now();
    const time = duration.split(':');
    const hours: number = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    const oneMinute = 60000;

    const expiration = date + hours * 60 * oneMinute + minutes * oneMinute;
    const objTokengenerate: object = {
      iss: server,
      aud: server,
      exp: parseInt(expiration.toString().slice(0, 10)),
      iat: Math.round(date / 1000),
      nbf: Math.round(date / 1000),
      data: {
        id: user.id,
        email: user.email,
      },
    };
    return this.jwtService.sign(objTokengenerate, {
      secret: secretKey,
      algorithm: 'HS256',
    });
  }
}
@Injectable()
export class AuthService {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private userRepo: typeof UserEntity,

    private readonly tokenGenerate: Tokengenerate,
    private readonly userService: UserService,
  ) {}

  async createUser(body: CreateUserDto) {
    try {
      await this.userService.validateEmail(body.email, false);

      const generatePass = this.createHashForPass(body.password);
      return await this.userRepo.create({
        name: body.name,
        email: body.email,
        password: generatePass,
        status: 1,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signIn(user: UserDataForTokenDto, host: string) {
    try {
      const response = await this.tokenGenerate.tokenGenerate(user, host);
      return { token: response };
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    let compare: boolean;

    try {
      user = await this.userService.validateEmail(email, true);
      const passForCompare = this.createHashForPass(password);
      compare = passForCompare === user.password;

      const response: object = {
        id: user.id,
        email: user.email,
      };

      if (!compare) return null;
      return response;
    } catch (error) {
      throw error;
    }
  }

  createHashForPass(password: string) {
    const salt: string = config().salt;
    const baseHash = String(salt + password);
    const hash = createHash('sha1').update(baseHash).digest('hex');
    return hash;
  }
}

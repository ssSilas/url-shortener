import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: typeof UserEntity,
  ) {}

  async findAll() {
    return await this.userRepo.findOne({
      attributes: ['name', 'email', 'status'],
    });
  }

  async validateEmail(email: string, shouldExist: boolean) {
    try {
      const user = await this.userRepo.findOne({
        raw: true,
        attributes: ['id', 'email', 'password'],
        where: { email },
      });

      if (shouldExist && !user) {
        throw new UnauthorizedException(
          'O usuário não existe. Por favor, insira um usuário válido',
        );
      }

      if (!shouldExist && user) {
        throw new BadRequestException(
          'O e-mail informado já está em uso. Por favor, insira um e-mail válido.',
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

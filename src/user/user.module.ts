import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useValue: UserEntity,
    },
  ],
  exports: ['USER_REPOSITORY', UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { PROVIDERS } from 'config/providers';
import { UrlShortenerEntity } from './url-shortener.entity';
import { UserModule } from 'src/user/user.module';
import { AccessController } from './access/access.controller';

@Module({
  imports: [UserModule],
  controllers: [UrlShortenerController, AccessController],
  providers: [
    UrlShortenerService,
    {
      provide: PROVIDERS.URL_SHORTENER_REPOSITORY,
      useValue: UrlShortenerEntity,
    },
  ],
  exports: [PROVIDERS.URL_SHORTENER_REPOSITORY, UrlShortenerService],
})
export class UrlShortenerModule {}

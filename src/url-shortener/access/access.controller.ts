import { Controller, Get, Param } from '@nestjs/common';
import { UrlShortenerService } from '../url-shortener.service';

@Controller()
export class AccessController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Get(':key')
  acessUrl(@Param('key') key: string) {
    console.log(key);
    return this.urlShortenerService.acessUrl(key);
  }
}

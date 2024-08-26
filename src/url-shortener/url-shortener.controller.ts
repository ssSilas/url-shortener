import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import {
  CreateUrlShortenerDto,
  updateUrlShortenerDto,
  UrlShortenerDto,
} from '../../helpers/dto/url-shortener.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { OptionalJwtAuthGuard } from 'src/auth/guard/optional-jwt-auth.guard';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  create(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
    @UserDecorator('email') userEmail: string,
  ) {
    if (userEmail) createUrlShortenerDto.email = userEmail;
    return this.urlShortenerService.create(createUrlShortenerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@UserDecorator('id') userId: number) {
    return this.urlShortenerService.findAll(userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @UserDecorator('id') userId: number,
    @Body() data: updateUrlShortenerDto,
  ) {
    return this.urlShortenerService.update(+id, userId, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @UserDecorator('id') userId: number) {
    return this.urlShortenerService.remove(+id, userId);
  }
}

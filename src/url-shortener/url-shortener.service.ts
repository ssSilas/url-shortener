import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUrlShortenerDto,
  updateUrlShortenerDto,
} from '../../helpers/dto/url-shortener.dto';
import { nanoid } from 'nanoid';

import { UrlShortenerEntity } from './url-shortener.entity';
import { UserService } from 'src/user/user.service';
import { PROVIDERS } from 'config/providers';
import config from 'config/db/config';

@Injectable()
export class UrlShortenerService {
  constructor(
    @Inject(PROVIDERS.URL_SHORTENER_REPOSITORY)
    private readonly urlShortenerRepo: typeof UrlShortenerEntity,
    private readonly userService: UserService,
  ) {}

  async create(data: CreateUrlShortenerDto) {
    const dataShort = await this.shortUrl(data.email);
    await this.urlShortenerRepo.create({
      userId: dataShort.userId,
      url_original: data.url,
      url_short: dataShort.nanoId,
    });

    const urlToShort = config().urlApp;
    const format = `${urlToShort}/${dataShort.nanoId}`;
    return { shortened: format };
  }

  async acessUrl(shortened: string) {
    try {
      const url = await this.urlShortenerRepo.findOne({
        where: { url_short: shortened },
      });

      if (!url) throw new NotFoundException('Url não encontrada.');

      url.count += 1;
      await url.save();
      return { redirect: url.url_original };
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: number) {
    return await this.urlShortenerRepo.findAll({
      attributes: [
        ['url_original', 'url'],
        ['url_short', 'shortened'],
        'count',
      ],
      where: { userId: userId },
    });
  }

  async update(id: number, userId: number, data: updateUrlShortenerDto) {
    await this.checkIfShortenedUrlExistsById(id, userId);
    const put = await this.urlShortenerRepo.update(
      { url_original: data.newUrl },
      { where: { id } },
    );
    return put ? { status: true } : { status: false };
  }

  async remove(id: number, userId: number) {
    await this.checkIfShortenedUrlExistsById(id, userId);
    const remove = await this.urlShortenerRepo.destroy({ where: { id } });
    return remove ? { status: true } : { status: false };
  }

  private async shortUrl(email?: string) {
    const userId = email
      ? (await this.userService.validateEmail(email, true)).id
      : null;

    const nanoId = nanoid(6);
    return { userId, nanoId };
  }

  async checkIfShortenedUrlExistsById(id: number, userId: number) {
    try {
      const data = await this.urlShortenerRepo.findOne({
        where: { id, userId },
      });

      if (!data) {
        throw new NotFoundException(
          'O dado solicitado não foi encontrado. Verifique se o dado existe e tente novamente.',
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateUrlShortenerDto {
  @IsNotEmpty({ message: 'Informe uma url.' })
  @IsUrl(undefined, { message: 'Informe uma url válida' })
  url: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'Informe um email válido' })
  email?: string;
}

export class updateUrlShortenerDto {
  @IsNotEmpty({ message: 'Informe uma url.' })
  @IsUrl(undefined, { message: 'Informe uma url válida' })
  newUrl: string;
}

export class UrlShortenerDto {
  @IsNotEmpty({ message: 'Informe uma url.' })
  @IsUrl(undefined, { message: 'Informe uma url válida' })
  url: string;
}

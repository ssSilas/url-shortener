import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Favor informar um nome' })
  name: string;

  @IsNotEmpty({ message: 'Favor informar um nome' })
  @IsEmail({}, { message: 'Favor informar um email válido' })
  email: string;

  @IsNotEmpty({ message: 'Favor informar uma senha' })
  password: string;
}

export class UserDataForTokenDto {
  id: number;
  email: string;
}

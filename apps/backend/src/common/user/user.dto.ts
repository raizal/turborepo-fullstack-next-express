import { SignInInput, User } from '@repo/entity';
import { CreateUserDto, UserResponseDto } from './user.types';

export function createUserDto(user: User & SignInInput): CreateUserDto {
  return {
    email: user.email,
    name: user.name,
    password: user.password,
  };
}

export function userResponseDto(user: User): UserResponseDto {
  return {
    email: user.email,
    name: user.name,
    photoURL: user.photoURL,
  };
}

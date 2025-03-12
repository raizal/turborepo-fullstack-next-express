import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { userResponseDto } from '@/common/user/user.dto';
import { AppError } from '@/models/error.model';
import { ResponseStatus, ServiceResponse } from '@/models/serviceResponse';
import { withErrorHandling } from '@/utils/errorHandling';

import { logout, resetPassword, signIn, userRegister } from '../repositories/auth.repository';
import { RegisterModel } from '../auth.dto';
import { UserResponseDto } from '@/common/user/user.types';
import { User } from '@repo/entity';

export const loginService = withErrorHandling(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginData = await signIn(email, password);

  if (!loginData) {
    throw new AppError('Invalid credentials', 400, StatusCodes.BAD_REQUEST);
  }
  const { uid, displayName, photoURL } = loginData;

  const userDto = userResponseDto({
    id: uid, email, name: displayName || '', photoURL: photoURL || undefined,
  });

  const response = new ServiceResponse<UserResponseDto & {token: string}>({
    status: ResponseStatus.Success,
    data: {...userDto, token: loginData.idToken.token},
    message: 'Login successful',
    statusCode: StatusCodes.OK,
  });

  return response;
});

export const logoutService = withErrorHandling(async (_, res: Response) => {
  await logout();

  return new ServiceResponse({
    status: ResponseStatus.Success,
    data: null,
    message: 'Logout successful',
    statusCode: StatusCodes.OK,
  });
});

export const resetPasswordService = withErrorHandling(async (req: Request) => {
  const { email } = req.body;
  await resetPassword(email);
  return new ServiceResponse({
    status: ResponseStatus.Success,
    data: null,
    message: 'Password reset email sent',
    statusCode: StatusCodes.OK,
  });
});

export const registerService = withErrorHandling(async (req: Request) => {
  const { email, password } = req.body;

  const data = new RegisterModel({email, password});

  await userRegister(data.email, data.password);
  return new ServiceResponse({
    status: ResponseStatus.Success,
    data: null,
    message: 'Email verification sent',
    statusCode: StatusCodes.OK,
  });
});

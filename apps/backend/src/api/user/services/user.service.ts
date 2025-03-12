import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthenticationError } from '@/models/error.model';
import { ResponseStatus, ServiceResponse } from '@/models/serviceResponse';
import { withErrorHandling } from '@/utils/errorHandling';

import { getUserData, updateUserData } from '../repositories/user.repository';

export const fetchUserDataService = withErrorHandling(async (req: Request) => {
  if (!req.user) {
    throw new AuthenticationError();
  }
  const data = await getUserData(req.user);
  return new ServiceResponse({
    status: ResponseStatus.Success,
    data,
    message: 'Ok',
    statusCode: StatusCodes.OK,
  });
});

export const updateUserDataService = withErrorHandling(async (req: Request) => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  const { name, phoneNumber, photoURL  } = req.body;
  const data = await updateUserData(req.user, {name, phoneNumber, photoURL});
  return new ServiceResponse({
    status: ResponseStatus.Success,
    data,
    message: 'User data updated',
    statusCode: StatusCodes.OK,
  });
});

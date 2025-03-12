import { asyncWrapper } from '@/utils/asyncWrapper';
import { handleServiceResponse } from '@/utils/httpHandlers';

import { fetchUserDataService, updateUserDataService } from './services/user.service';
import { Request } from 'express';

export const UserController = {
  updateUserData: asyncWrapper(async (req, res) => {
    handleServiceResponse(await updateUserDataService(req, res), res);
  }),
  getUserData: asyncWrapper(async (req: Request, res) => {
    handleServiceResponse(await fetchUserDataService(req, res), res);
  }),
};

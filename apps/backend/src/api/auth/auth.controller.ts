import { asyncWrapper } from '@/utils/asyncWrapper';
import { handleServiceResponse } from '@/utils/httpHandlers';

import { loginService, logoutService, registerService, resetPasswordService } from './services/auth.service';

export const AuthController = {
  login: asyncWrapper(async (req, res) => {
    const serviceResponse = await loginService(req, res);
    handleServiceResponse(serviceResponse, res);
  }),
  logout: asyncWrapper(async (req, res) => {
    const serviceResponse = await logoutService(req, res);
    handleServiceResponse(serviceResponse, res);
  }),
  resetPassword: asyncWrapper(async (req, res) => {
    const serviceResponse = await resetPasswordService(req);
    handleServiceResponse(serviceResponse, res);
  }),
  register: asyncWrapper(async (req, res) => {
    handleServiceResponse(await registerService(req, res), res);
  }),
};

import express, { Router } from 'express';

import { AuthController } from './auth.controller';

export const authRouter: Router = (() => {
  const router = express.Router();
  router.post('/login', AuthController.login);
  router.post('/reset-password', AuthController.resetPassword);
  router.post('/logout', AuthController.logout);
  router.post('/register', AuthController.register);
  return router;
})();

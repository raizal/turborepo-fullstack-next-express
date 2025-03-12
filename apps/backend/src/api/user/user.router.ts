import express, { Router } from 'express';

import { UserController } from './user.controller';
import { authMiddleware } from '@/middleware/auth';
import { db } from '@/config/firebase-config';

export const userRouter: Router = (() => {
  const router = express.Router();
  router.use(authMiddleware)
  router.post('/update-user-data', UserController.updateUserData);
  router.get('/fetch-user-data', UserController.getUserData);
  return router;
})();

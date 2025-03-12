import express, { Router } from 'express';

import auth from './auth';
import user from './user';
import healthCheckRouter from './healthCheck';
import { db } from '@/config/firebase-config';

export const apiRouter: Router = (() => {
  const router = express.Router();
  router.use('/auth', auth);
  router.use('/user', user);
  router.use('/health', healthCheckRouter);
  router.get('/test', async (req, res) => {
    const collection = await db.collection('USERS').get();
    const docs = collection.docs.map((doc) => doc.data());
    return res.json(docs);
  });

  return router;
})();

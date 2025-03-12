import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { logger } from '@/config/logger/index';
import rateLimiter from '@/middleware/rateLimiter';
import requestLogger from '@/middleware/requestLogger';
import { env } from '@/utils/envConfig';

import { globalErrorHandler } from './middleware/errorHandler';
import { apiRouter } from './api';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/api', apiRouter);
app.get('/', (req: Request, res: Response) => {
  res.status(404).send('Not found');
});

// not found
app.use((_req, res) => {
  res.status(404).send('Not found');
});

// Error handlers
app.use(globalErrorHandler);

export { app, logger };

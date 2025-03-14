import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

dotenv.config();
export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(10000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  JWT_SECRET: str({ devDefault: testOnly('fasfadfasdfasdfasdfasdfasdf') }),
  JWT_REFRESH_SECRET: str({ devDefault: testOnly('fasfadfasdfasdfasdfasdfasdf') }),
  JWT_EXPIRES_IN: str({ devDefault: testOnly('30m') }),
  JWT_REFRESH_EXPIRES_IN: str({ devDefault: testOnly('7d') }),
  REDIS_HOST: host({ devDefault: testOnly('your host') }),
  REDIS_PORT: port({ devDefault: testOnly(1111) }),
});

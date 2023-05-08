import * as process from 'process';
const configs = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  GLOBAL: {
    PORT: process.env.PORT || 3000,
  },
  MONGODB: {
    URL: process.env.MONGODB_URL,
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASS,
  },
  SECRET_JWT: process.env.SECRET_JWT,
  EXPIRE_JWT: process.env.EXPIRE_JWT,
});
export default configs;

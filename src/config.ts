import * as process from 'process';
const configs = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  global: {
    port: process.env.PORT || 3000,
  },
});
export default configs;

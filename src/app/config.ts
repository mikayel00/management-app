import * as process from 'process';
const configs = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  GLOBAL: {
    PORT: process.env.PORT || 3000,
  },
  MONGODB: {
    URL:
      process.env.MONGODB_URI ||
      'mongodb+srv://dumbuser:dumbpass@cluster0.cgroo9x.mongodb.net/?retryWrites=true&w=majority',
    USER: process.env.MONGODB_USER || 'dumbuser',
    PASSWORD: process.env.MONGODB_PASS || 'dumbpassword',
  },
});
export default configs;

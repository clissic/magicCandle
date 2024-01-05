import { Command } from 'commander';
import dotenv from 'dotenv';

const program = new Command();
program.option('--mode <mode>', 'Work mode', 'DEVELOPMENT');
program.parse();

dotenv.config({
  path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production',
});

export default {
  port: process.env.PORT,
  mongoPassword: process.env.MONGODB_PASSWORD,
  persistence: process.env.PERSISTENCE,
  googleEmail: process.env.GOOGLE_EMAIL,
  googlePass: process.env.GOOGLE_PASS,
  loggerEnv: process.env.LOGGER_ENV,
  apiUrl: process.env.API_URL,
};
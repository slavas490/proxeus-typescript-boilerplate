import dotenv from 'dotenv';

dotenv.config();

class EnvironmentVariableRequiredError extends Error {
  constructor(variable: string) {
    super(`${variable} environment variable is required but is missing.`);
  }
}

if (!process.env.NODE_ENV) {
  throw new EnvironmentVariableRequiredError('NODE_ENV');
}

if (!process.env.PORT) {
  throw new EnvironmentVariableRequiredError('PORT');
}

export default {
  LOGGER: process.env.logger === 'true',
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT) || 8010,
  PROXEUS_CORE_URL: process.env.PROXEUS_CORE_URL || 'http://127.0.0.1:1323',
  PROXEUS_NODE_URL: process.env.PROXEUS_NODE_URL || null,
  PROXEUS_NODE_ID: process.env.PROXEUS_NODE_ID || 'my-node',
  PROXEUS_NODE_NAME: process.env.PROXEUS_NODE_ID || 'My Node',
  PROXEUS_NODE_DESCRIPTION:
    process.env.PROXEUS_NODE_DESCRIPTION || 'Makes something valuable',
  PROXEUS_NODE_JWT_SECRET:
    process.env.PROXEUS_NODE_JWT_SECRET || 'my-node-jwt-secret',
};

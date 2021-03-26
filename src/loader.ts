import { config } from 'dotenv';

export const loadEnvironmentVariables = async () => {
  const path = `${process.env.NODE_ENV}.env`;
  config({ path: './src/env/' + path });
};

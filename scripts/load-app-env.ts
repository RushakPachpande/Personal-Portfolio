import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';

function requestedEnv() {
  const flag = process.argv.find((argument) => argument.startsWith('--env='));
  if (flag) return flag.slice('--env='.length);
  if (process.env.APP_ENV) return process.env.APP_ENV;
  return 'dev';
}

export function loadAppEnv() {
  const requested = requestedEnv();
  const env =
    requested === 'prod' || requested === 'production' ? 'prod' : 'dev';
  const files = env === 'prod' ? ['.env.prod'] : ['.env.dev', '.env.local'];

  for (const file of files) {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) continue;
    config({ path: filePath, override: true });
  }

  return env;
}

import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const ASSET = /\.(png|jpe?g|gif|webp|svg)$/i;

export async function resolve(specifier, context, nextResolve) {
  if (!ASSET.test(specifier.split('?')[0] ?? '')) {
    return nextResolve(specifier, context);
  }

  if (specifier.startsWith('file:')) {
    return { url: specifier, shortCircuit: true };
  }

  const parentDir = context.parentURL
    ? path.dirname(fileURLToPath(context.parentURL))
    : process.cwd();
  const resolved = path.resolve(parentDir, specifier);
  if (fs.existsSync(resolved)) {
    return { url: pathToFileURL(resolved).href, shortCircuit: true };
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (!ASSET.test(url.split('?')[0] ?? '')) {
    return nextLoad(url, context);
  }

  const filePath = fileURLToPath(url);
  return {
    format: 'module',
    shortCircuit: true,
    source: `export default ${JSON.stringify(filePath)};\n`,
  };
}

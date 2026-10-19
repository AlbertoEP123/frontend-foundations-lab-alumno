import { access } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { exercises } from '../site/curriculum.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requested = process.argv[2];
if (!requested) {
  console.error('Uso: npm run test:exercise -- 08');
  process.exit(1);
}

const padded = /^\d+$/.test(requested) ? requested.padStart(2, '0') : requested;
const exercise = exercises.find((item) => item.number === padded || item.id === requested);
if (!exercise) {
  console.error(`No existe el ejercicio ${requested}.`);
  process.exit(1);
}

const testFile = path.join(root, 'exercises', exercise.id, 'tests.mjs');
try {
  await access(testFile);
} catch {
  console.error(`El ejercicio ${exercise.number} no tiene pruebas automaticas. Revisa sus criterios manuales.`);
  process.exit(1);
}

const child = spawn(process.execPath, ['--test', testFile], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env }
});

child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`Pruebas interrumpidas por ${signal}.`);
    process.exit(1);
  }
  process.exit(code ?? 1);
});

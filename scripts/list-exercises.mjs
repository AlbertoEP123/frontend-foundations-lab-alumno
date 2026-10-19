import { exercises, modules } from '../site/curriculum.mjs';

for (const module of modules) {
  const items = exercises.filter((exercise) => exercise.module === module.id);
  if (items.length === 0) continue;
  console.log(`\n${module.label}`);
  console.log('-'.repeat(module.label.length));
  for (const item of items) {
    console.log(`${item.number}. ${item.title} · ${item.duration}`);
    if (item.testCommand) console.log(`    ${item.testCommand}`);
    if (item.module === 'typescript') console.log(`    npm run typecheck:exercise -- ${item.number}`);
  }
}

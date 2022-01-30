import { compile, CompileOptions } from './compile';
import * as fs from 'fs';
import glob from "fast-glob";

const config: CompileOptions = {
  schemaInput: '/**/*.schema.graphql',
  schemaOutput: './schema.graphql',
  documents: ['client/**/*.queries.ts', 'client/**/*.mutations.ts'],
  typesOutputFrontEnd: '/client/graphql.types.ts',
  typesOutputBackEnd: '/graphql.types.ts',
  templatesDirectory: 'templates',
};

(async () => {
  console.log('👀 Watching for changes...');
  const files = await glob([
    `${__dirname}${config.schemaInput}`, 
    ...config.documents.map(document => `${__dirname}/${document}`)
  ]);
  files.forEach((file: string) => {
    fs.watchFile(file, { interval: 1000 }, async (curr: fs.Stats, prev: fs.Stats) => {
      if (curr.mtime > prev.mtime) {
        try {
          console.log(`🥸 Detectied change in ${file.split('/')[file.split('/').length - 1]}.`);
          await compile(config);
          console.log('🥳 Compiled successfully.');
          console.log('👀 Watching for changes...');
        } catch (err) {
          console.error(err);
          console.log('👀 Watching for changes...');
        }
      }
    });
  });
})();
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

let scaffold;
const __dirname = dirname(fileURLToPath(import.meta.url));        // eslint-disable-line no-underscore-dangle
const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

Before(async function () {
  this.projectRoot = process.cwd();
  this.testDirectory = `${process.cwd()}/${any.word()}`;
  this.testBaseUrl = any.url();

  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  ({scaffold} = await import('@form8ion/cypress-scaffolder'));

  stubbedFs({
    node_modules: stubbedNodeModules,
    templates: stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'templates'))
  });
});

When('the project is scaffolded', async function () {
  this.results = await scaffold({
    projectRoot: this.projectRoot,
    testDirectory: this.testDirectory,
    testBaseUrl: this.testBaseUrl
  });
});

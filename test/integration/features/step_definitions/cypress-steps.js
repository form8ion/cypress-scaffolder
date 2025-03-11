import {promises as fs} from 'node:fs';

import assert from 'node:assert';
import {Then} from '@cucumber/cucumber';

Then('the cypress configuration is defined', async function () {
  const config = JSON.parse(await fs.readFile(`${this.projectRoot}/cypress.json`, 'utf-8'));

  assert.deepEqual(config, {integrationFolder: this.testDirectory, baseUrl: this.testBaseUrl});
});

Then('cypress directories are ignored from version control', async function () {
  assert.deepEqual(
    this.results.vcsIgnore.directories,
    ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']
  );
});

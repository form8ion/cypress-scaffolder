import assert from 'node:assert';
import {Then} from '@cucumber/cucumber';

Then('dependencies are defined', async function () {
  assert.deepEqual(this.results.dependencies.javascript.development, ['cypress']);
});

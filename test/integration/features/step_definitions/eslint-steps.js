import assert from 'node:assert';
import {Then} from '@cucumber/cucumber';

Then('eslint config is defined', async function () {
  assert.deepEqual(this.results.eslint.configs, [{name: 'cypress', files: `${this.testDirectory}**/*-spec.js`}]);
});

import {fileExists} from '@form8ion/core';

import assert from 'node:assert';
import {Then} from '@cucumber/cucumber';

Then('a canary test is created', async function () {
  assert.equal(await fileExists(`${this.testDirectory}/canary-spec.js`), true);
});

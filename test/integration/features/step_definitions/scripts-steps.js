import assert from 'node:assert';
import {Then} from '@cucumber/cucumber';

Then('scripts are defined', async function () {
  assert.deepEqual(this.results.scripts, {'cypress:run': 'cypress run', 'cypress:open': 'cypress open'});
});

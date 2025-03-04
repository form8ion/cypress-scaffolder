import {resolve} from 'path';
import {promises} from 'fs';
import core from '@form8ion/core';

import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as mkdir from '../thirdparty-wrappers/make-dir';
import {scaffold} from './scaffolder';

suite('scaffolder', () => {
  let sandbox;
  const pathToCreatedDirectory = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(promises, 'copyFile');
    sandbox.stub(mkdir, 'default');
    sandbox.stub(core, 'writeConfigFile');
  });

  teardown(() => sandbox.restore());

  test('that cypress dependencies are defined and config files are created', async () => {
    const projectRoot = any.string();
    const testDirectory = any.string();
    const testBaseUrl = any.url();
    mkdir.default.withArgs(testDirectory).resolves(pathToCreatedDirectory);

    const results = await scaffold({projectRoot, testDirectory, testBaseUrl});

    assert.calledWith(
      core.writeConfigFile,
      {
        name: 'cypress',
        path: projectRoot,
        format: core.fileTypes.JSON,
        config: {integrationFolder: testDirectory, baseUrl: testBaseUrl}
      }
    );
    assert.calledWith(
      promises.copyFile,
      resolve(__dirname, '..', 'templates', 'canary-spec.js'),
      `${pathToCreatedDirectory}/canary-spec.js`
    );
    assert.deepEqual(
      results,
      {
        dependencies: {javascript: {development: ['cypress']}},
        scripts: {
          'cypress:run': 'cypress run',
          'cypress:open': 'cypress open'
        },
        vcsIgnore: {
          files: [],
          directories: ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']
        },
        eslint: {configs: [{name: 'cypress', files: `${testDirectory}**/*-spec.js`}]}
      }
    );
  });
});

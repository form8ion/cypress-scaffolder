import {resolve} from 'path';
import {promises} from 'fs';
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

    sandbox.stub(promises, 'writeFile');
    sandbox.stub(promises, 'copyFile');
    sandbox.stub(mkdir, 'default');
  });

  teardown(() => sandbox.restore());

  test('that spectacle dependencies are defined and config files are created', async () => {
    const projectRoot = any.string();
    const testDirectory = any.string();
    const testBaseUrl = any.url();
    promises.writeFile.resolves();
    mkdir.default.withArgs(testDirectory).resolves(pathToCreatedDirectory);

    const results = await scaffold({projectRoot, testDirectory, testBaseUrl});

    assert.calledWith(
      promises.writeFile,
      `${projectRoot}/cypress.json`,
      JSON.stringify({integrationFolder: testDirectory, baseUrl: testBaseUrl})
    );
    assert.calledWith(
      promises.copyFile,
      resolve(__dirname, '..', 'templates', 'canary-spec.js'),
      `${pathToCreatedDirectory}/canary-spec.js`
    );
    assert.deepEqual(
      results,
      {
        dependencies: [],
        devDependencies: ['cypress'],
        scripts: {
          'cypress:run': 'cypress run',
          'cypress:open': 'cypress open'
        },
        vcsIgnore: {
          files: [],
          directories: ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']
        },
        eslintConfigs: [{name: 'cypress', files: `${testDirectory}**/*-spec.js`}]
      }
    );
  });
});

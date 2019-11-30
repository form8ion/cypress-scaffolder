import {promises} from 'fs';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {scaffold} from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(promises, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that spectacle dependencies are defined and config files are created', async () => {
    const projectRoot = any.string();
    const testDirectory = any.string();
    const testBaseUrl = any.url();
    promises.writeFile.resolves();

    const results = await scaffold({projectRoot, testDirectory, testBaseUrl});

    assert.calledWith(
      promises.writeFile,
      `${projectRoot}/cypress.json`,
      JSON.stringify({integrationFolder: testDirectory, baseUrl: testBaseUrl})
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
        eslintConfigs: ['cypress']
      }
    );
  });
});

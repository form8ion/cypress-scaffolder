import {assert} from 'chai';
import {scaffold} from './scaffolder';

suite('scaffolder', () => {
  test('that spectacle dependencies are defined', async () => {
    assert.deepEqual(
      await scaffold({}),
      {
        dependencies: [],
        devDependencies: ['cypress'],
        scripts: {
          'cypress:run': 'cypress run',
          'cypress:open': 'cypress open'
        },
        vcsIgnore: {files: [], directories: ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']},
        eslintConfigs: ['cypress']
      }
    );
  });
});

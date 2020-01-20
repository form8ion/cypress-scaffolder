import {resolve} from 'path';
import {promises} from 'fs';
import mkdir from '../thirdparty-wrappers/make-dir';

export async function scaffold({projectRoot, testDirectory, testBaseUrl}) {
  const [createdTestDirectory] = await Promise.all([
    mkdir(testDirectory),
    promises.writeFile(
      `${projectRoot}/cypress.json`,
      JSON.stringify({integrationFolder: testDirectory, baseUrl: testBaseUrl})
    )
  ]);

  await promises.copyFile(
    resolve(__dirname, '..', 'templates', 'canary-spec.js'),
    `${createdTestDirectory}/canary-spec.js`
  );

  return {
    dependencies: [],
    devDependencies: ['cypress'],
    scripts: {
      'cypress:run': 'cypress run',
      'cypress:open': 'cypress open'
    },
    vcsIgnore: {files: [], directories: ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']},
    eslintConfigs: [{name: 'cypress', files: `${testDirectory}**/*-spec.js`}]
  };
}

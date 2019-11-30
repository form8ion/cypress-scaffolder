import {promises} from 'fs';

export async function scaffold({projectRoot, testDirectory, testBaseUrl}) {
  await promises.writeFile(
    `${projectRoot}/cypress.json`,
    JSON.stringify({integrationFolder: testDirectory, baseUrl: testBaseUrl})
  );

  return {
    dependencies: [],
    devDependencies: ['cypress'],
    scripts: {
      'cypress:run': 'cypress run',
      'cypress:open': 'cypress open'
    },
    vcsIgnore: {files: [], directories: ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']},
    eslintConfigs: ['cypress']
  };
}

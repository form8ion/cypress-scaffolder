import {dirname, resolve} from 'node:path';
import {promises as fs} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {fileTypes, writeConfigFile} from '@form8ion/core';

const __dirname = dirname(fileURLToPath(import.meta.url));        // eslint-disable-line no-underscore-dangle

export async function scaffold({projectRoot, testDirectory, testBaseUrl}) {
  await Promise.all([
    fs.mkdir(testDirectory),
    writeConfigFile({
      path: projectRoot,
      name: 'cypress',
      format: fileTypes.JSON,
      config: {integrationFolder: testDirectory, baseUrl: testBaseUrl}
    })
  ]);

  await fs.copyFile(
    resolve(__dirname, '..', 'templates', 'canary-spec.js'),
    `${testDirectory}/canary-spec.js`
  );

  return {
    dependencies: {javascript: {development: ['cypress']}},
    scripts: {
      'cypress:run': 'cypress run',
      'cypress:open': 'cypress open'
    },
    vcsIgnore: {files: [], directories: ['/cypress/fixtures/', '/cypress/videos/', '/cypress/screenshots']},
    eslint: {configs: [{name: 'cypress', files: `${testDirectory}**/*-spec.js`}]}
  };
}

import {resolve} from 'path';
import {promises} from 'fs';
import {fileTypes, writeConfigFile} from '@form8ion/core';

import mkdir from '../thirdparty-wrappers/make-dir';

export async function scaffold({projectRoot, testDirectory, testBaseUrl}) {
  const [createdTestDirectory] = await Promise.all([
    mkdir(testDirectory),
    writeConfigFile({
      path: projectRoot,
      name: 'cypress',
      format: fileTypes.JSON,
      config: {integrationFolder: testDirectory, baseUrl: testBaseUrl}
    })
  ]);

  await promises.copyFile(
    resolve(__dirname, '..', 'templates', 'canary-spec.js'),
    `${createdTestDirectory}/canary-spec.js`
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

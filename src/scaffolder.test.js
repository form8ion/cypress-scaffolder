import {promises as fs} from 'node:fs';
import {resolve} from 'node:path';
import {writeConfigFile, fileTypes} from '@form8ion/core';

import any from '@travi/any';
import {it, vi, describe, expect} from 'vitest';

import {scaffold} from './scaffolder.js';

vi.mock('node:fs');
vi.mock('@form8ion/core');

describe('scaffolder', () => {
  it('should create the config files and define the cypress dependencies', async () => {
    const projectRoot = any.string();
    const testDirectory = any.string();
    const testBaseUrl = any.url();

    const results = await scaffold({projectRoot, testDirectory, testBaseUrl});

    expect(fs.mkdir).toHaveBeenCalledWith(testDirectory);
    expect(writeConfigFile).toHaveBeenCalledWith({
      name: 'cypress',
      path: projectRoot,
      format: fileTypes.JSON,
      config: {integrationFolder: testDirectory, baseUrl: testBaseUrl}
    });
    expect(fs.copyFile).toHaveBeenCalledWith(
      resolve(__dirname, '..', 'templates', 'canary-spec.js'),
      `${testDirectory}/canary-spec.js`
    );
    expect(results).toEqual({
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
    });
  });
});

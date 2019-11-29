export async function scaffold() {
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

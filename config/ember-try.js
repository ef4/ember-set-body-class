/* eslint-env node */
module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: 'ember-3.10',
      npm: {
        devDependencies: {
          'ember-source': '~3.10.0',
        },
      },
    },
    {
      name: 'ember-lts-3.12',
      npm: {
        devDependencies: {
          'ember-source': '~3.12.0',
        },
      },
    },
    {
      name: 'ember-lts-3.16',
      npm: {
        devDependencies: {
          'ember-source': '~3.16.0',
        },
      },
    },
    {
      name: 'ember-lts-3.20',
      npm: {
        devDependencies: {
          'ember-source': '~3.20.0',
        },
      },
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          ember: 'components/ember#release',
        },
        resolutions: {
          ember: 'release',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          ember: 'components/ember#beta',
        },
        resolutions: {
          ember: 'beta',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          ember: 'components/ember#canary',
        },
        resolutions: {
          ember: 'canary',
        },
      },
      npm: {
        devDependencies: {
          'ember-source': null,
        },
      },
    },
    {
      name: 'ember-default',
      npm: {
        devDependencies: {},
      },
    },
  ],
};

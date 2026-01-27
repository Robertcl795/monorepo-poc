const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'challenger',
  publicHost: 'http://localhost:4203',

  exposes: {
    './routes': './apps/remotes/challenger/src/app/remote.routes.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    'monaco-editor',
    '@material/web',
    // Add further packages you don't need at runtime
  ],

  sharedMappings: ['@rocker-code/shared', '@rocker-code/theme'],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
});

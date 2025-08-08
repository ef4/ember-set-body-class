import babel from '@rollup/plugin-babel';
import { Addon } from '@embroider/addon-dev/rollup';
import typescript from '@rollup/plugin-typescript';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['helpers/**/*.ts', 'services/**/*.ts']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports(['helpers/set-body-class.ts', 'services/body-class.ts']),

    // Compile TypeScript files
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      outDir: 'dist',
      declarationDir: 'dist',
    }),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
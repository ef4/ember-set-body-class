/* eslint-env node */

const FastBoot = require('fastboot');
const { execFileSync } = require('child_process');
const { module: Qmodule, test } = require('qunitjs');

Qmodule('Fastboot', function(hooks) {
  let fastboot;

  hooks.before(async function() {
    execFileSync('node', ['./node_modules/.bin/ember', 'build']);
    fastboot = new FastBoot({
      distPath: 'dist',
      resilient: false
    });
  });

  test('it works', async function(assert) {
    let page = await fastboot.visit('/');
    let html = await page.html();
    assert.ok(/<body +class=".*red-text.*"/.test(html), 'should find red-text class on body');
  });
});

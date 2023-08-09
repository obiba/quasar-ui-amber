/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf (conf, api) {
  // register our boot file
  conf.boot.push('~@obiba/quasar-app-extension-amber/src/boot/register.js')

  if (api.hasVite !== true) {
    // make sure app extension files & ui package gets transpiled
    conf.build.transpileDependencies.push(/quasar-app-extension-amber[\\/]src/)
    conf.build.transpileDependencies.push(/quasar-ui-amber[\\/]src/)
  }
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^2.0.0')
  
  if (api.hasVite === true) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0|^2.0.0')
  }
  else {
    api.compatibleWith('@quasar/app-webpack', '^3.0.0|^4.0.0')
  }

  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('QADate', '~quasar-ui-amber/src/components/QADate.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}

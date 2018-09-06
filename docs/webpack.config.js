import WebpackShellPlugin from 'webpack-shell-plugin';

export default function makeWebpackConfig() {
  var config = {};

  config.plugins = [
    new WebpackShellPlugin({onBuildStart: ['bin/generate-i18n']})
  ];

  // the rest of your webpack config...

  return config;
}();

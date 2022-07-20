const { DefinePlugin } = require("webpack");
const AutoReloadPlugin = require("../../webpack-plugins/auto-reload.plugin");
const { appBuildDevPath } = require("../paths");

module.exports.getDevelopmentConfig = function () {
  return {
    devtool: "inline-source-map",
    watch: true,
    mode: 'development',
    output: {
      path: appBuildDevPath,
      filename: '[name].js',
    },
    plugins: [
      new DefinePlugin({
        AUTO_RELOADER: JSON.stringify(true),
        VERSION: JSON.stringify('Dev'),
      }),
      new AutoReloadPlugin({port: 8497}),
    ],
  };
}

const { DefinePlugin } = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");
const { appBuildProdRawPath, appBuildProdPath } = require("../paths");

module.exports.getProductionConfig = function () {
  return {
    mode: 'production',
    output: {
      path: appBuildProdRawPath,
      filename: '[name].js',
    },
    plugins: [
      new DefinePlugin({
        AUTO_RELOADER: JSON.stringify(false),
        VERSION: JSON.stringify(process.env.VERSION),
      }),
      new ZipPlugin({
        path: appBuildProdPath,
        filename: 'extension.zip',
        extension: 'zip',
        pathPrefix: 'jstris-bot',
        exclude: [/\.txt$/],
      })
    ],
  };
}

const { DefinePlugin } = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");
const { appBuildProdFirefoxPath, appBuildProdFirefoxRawPath, appBuildProdChromeRawPath, appBuildProdChromePath } = require("../utils/paths");
const { getExtName } = require("../utils/ext");

module.exports.getProductionConfig = function (target) {
  const outRawPath = target === 'chrome' ? appBuildProdChromeRawPath : appBuildProdFirefoxRawPath;
  const outPath = target === 'chrome' ? appBuildProdChromePath : appBuildProdFirefoxPath;
  const zipPlugin = target === 'chrome' ? (
    new ZipPlugin({
      path: outPath,
      filename: 'extension.zip',
      extension: 'zip',
      pathPrefix: getExtName(),
      exclude: [/\.txt$/],
    })
  ) : (
    new ZipPlugin({
      path: outPath,
      filename: getExtName() + '.zip',
      extension: 'zip',
      exclude: [/\.txt$/],
    })
  );
  return {
    mode: 'production',
    output: {
      path: outRawPath,
      filename: '[name].js',
    },
    plugins: [
      new DefinePlugin({
        AUTO_RELOADER: JSON.stringify(false),
        VERSION: JSON.stringify(process.env.VERSION),
      }),
      zipPlugin,
    ],
  };
}

const path = require('path');
const webpack = require('webpack');
const { default: merge } = require('webpack-merge');
const { getCommonConfig } = require('./configs/common');
const { getProductionConfig } = require('./configs/production');
const { getCustomWebpackConfig } = require('./utils/custom-webpack');

module.exports = (target) => {
  const commonConfig = getCommonConfig(target);
  const productionConfig = getProductionConfig(target);
  const customWebpackConfig = getCustomWebpackConfig();
  const config = merge(commonConfig, productionConfig, customWebpackConfig);

  webpack(config, (err, stats) => {
    if (err) {
      console.error('Internal error:', err);
      return;
    }
    if (stats.hasErrors()) {
      console.error('Compilation has errors!');
      console.log(stats.toJson().errors)
      console.error(stats.toJson().errors.map(x => x.message + '\n\n' + x.details + '\n\n' + x.stack).join('\n\n---\n\n'));
      return;
    }
    console.log('Compiled for "' + target + '"! Build on "' + path.resolve(config.output.path, '..') + '"!');
  });
}

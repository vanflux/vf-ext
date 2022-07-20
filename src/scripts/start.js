const webpack = require('webpack');
const { default: merge } = require('webpack-merge');
const { getCommonConfig } = require('./configs/common');
const { getDevelopmentConfig } = require('./configs/development');

module.exports = () => {
  const commonConfig = getCommonConfig();
  const developmentConfig = getDevelopmentConfig();
  const config = merge(commonConfig, developmentConfig);

  webpack(config, (err, stats) => {
    if (err) {
      console.error('Internal error:', err);
      return;
    }
    if (stats.hasErrors()) {
      console.error('Compilation has errors!');
      console.error(stats.toJson().errors.map(x => x.message + '\n\n' + x.details + '\n\n' + x.stack).join('\n\n---\n\n'));
      return;
    }
    console.log('Compiled! Build on "build/dev" directory!');
  });
}

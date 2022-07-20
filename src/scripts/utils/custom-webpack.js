const { existsSync } = require("fs");
const { appWebpackPath } = require("./paths")

module.exports.getCustomWebpackConfig = function() {
  if (!existsSync(appWebpackPath)) return {};
  return require(appWebpackPath) || {};
}

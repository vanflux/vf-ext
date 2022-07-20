const { appPackagePath } = require("./paths");

module.exports.getExtName = function() {
  const package = require(appPackagePath) || {};
  return package.name || 'extension';
}

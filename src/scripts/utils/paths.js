const fs = require('fs');
const path = require('path');

const cmdPath = fs.realpathSync(process.cwd());

const modPath = path.resolve(fs.realpathSync(__dirname), '../../..');
const modSrcPath = path.resolve(modPath, './src');
const modBackgroundEntryPath = path.resolve(modSrcPath, './background/index.ts');
const modContentEntryPath = path.resolve(modSrcPath, './content/index.ts');
const modPageEntryPath = path.resolve(modSrcPath, './page/index.ts');
const modNopPath = path.resolve(modSrcPath, './nop.ts');
const modExamplePath = path.resolve(modPath, './example');
const modExamplePublicPath = path.resolve(modExamplePath, './public');
const modExampleSrcPath = path.resolve(modExamplePath, './src');
const modExampleTsConfigPath = path.resolve(modExamplePath, './tsconfig.json');

const appPath = fs.realpathSync(process.cwd());
const appSrcPath = path.resolve(appPath, 'src');
const appPublicPath = path.resolve(appPath, 'public');
const appPackagePath = path.resolve(appPath, 'package.json');
const appWebpackPath = path.resolve(appPath, 'webpack.config.js');
const appManifestPath = path.resolve(appPublicPath, 'manifest.json');
const appBuildPath = path.resolve(appPath, 'build');
const appBuildDevPath = path.resolve(appBuildPath, 'dev');
const appBuildProdPath = path.resolve(appBuildPath, 'prod');
const appBuildProdChromePath = path.resolve(appBuildProdPath, 'chrome');
const appBuildProdChromeRawPath = path.resolve(appBuildProdChromePath, 'raw');
const appBuildProdFirefoxPath = path.resolve(appBuildProdPath, 'firefox');
const appBuildProdFirefoxRawPath = path.resolve(appBuildProdFirefoxPath, 'raw');

const appBackgroundEntryPaths = [
  path.resolve(appSrcPath, './background/index.ts'),
  path.resolve(appSrcPath, './background/index.tsx'),
  modNopPath,
];
const appContentEntryPaths = [
  path.resolve(appSrcPath, './content/index.ts'),
  path.resolve(appSrcPath, './content/index.tsx'),
  modNopPath,
];
const appPageEntryPaths = [
  path.resolve(appSrcPath, './page/index.ts'),
  path.resolve(appSrcPath, './page/index.tsx'),
  modNopPath,
];

module.exports = {
  cmdPath,
  modPath,
  modSrcPath,
  modBackgroundEntryPath,
  modContentEntryPath,
  modPageEntryPath,
  modNopPath,
  modExamplePath,
  modExamplePublicPath,
  modExampleSrcPath,
  modExampleTsConfigPath,
  appPath,
  appSrcPath,
  appPublicPath,
  appPackagePath,
  appWebpackPath,
  appManifestPath,
  appBuildPath,
  appBuildDevPath,
  appBuildProdPath,
  appBuildProdChromePath,
  appBuildProdChromeRawPath,
  appBuildProdFirefoxPath,
  appBuildProdFirefoxRawPath,
  appBackgroundEntryPaths,
  appContentEntryPaths,
  appPageEntryPaths,
};

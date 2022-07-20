const { mkdirSync, copyFileSync, existsSync } = require("fs");
const { copySync } = require('fs-extra');
const { modExamplePublicPath, modExampleSrcPath, modExampleTsConfigPath, modExampleWebpackPath, cmdPath } = require("./utils/paths");
const { resolve } = require("path");
const { writeFileSync } = require("fs");
const { spawnSync } = require("child_process");
const { readFileSync } = require("fs");

module.exports = () => {
  const name = process.argv[3];
  if (name === undefined) return console.error('You need to inform a name to create project: "vfe create <name>"!');
  if (name.length <= 0) return console.error('The name must have at least 1 character!');
  if (name.match(/[^\w\-]/)) return console.error('The name can only have letters, numbers, dashes and underlines!');

  const projectDir = resolve(cmdPath, name);

  const alreadyExists = existsSync(projectDir);
  if (alreadyExists) return console.error('A project with this name already exists!');

  console.log('Creating project "' + name + '".');
  mkdirSync(projectDir);

  console.log('Copying files');
  copySync(modExamplePublicPath, resolve(projectDir, 'public'));
  copySync(modExampleSrcPath, resolve(projectDir, 'src'));
  copyFileSync(modExampleTsConfigPath, resolve(projectDir, 'tsconfig.json'));
  copyFileSync(modExampleWebpackPath, resolve(projectDir, 'webpack.config.js'));

  console.log('Preparing manifest.json');
  const manifestPath = resolve(projectDir, 'public/manifest.json');
  const manifestContent = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifestContent.name = name;
  writeFileSync(manifestPath, JSON.stringify(manifestContent, null, '\t'), 'utf8');

  const packageJsonContent = {
    name,
    version: '1.0.0',
    description: 'Project generated with VFE.',
    scripts: {
      start: 'vfe start',
      build: 'vfe build',
    },
    keywords: [],
    author: '',
    license: 'ISC',
  };
  console.log('Creating package.json');
  writeFileSync(resolve(projectDir, 'package.json'), JSON.stringify(packageJsonContent, null, '\t'), 'utf8');

  console.log('Installing dependencies');
  const ret = spawnSync(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['i', 'https://github.com/vanflux/vf-ext-framework.git'], { cwd: projectDir });
  console.error(ret.stdout.toString(), ret.stderr.toString());

  console.log('Project created!', projectDir);
}

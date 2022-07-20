#!/usr/bin/env node

const scriptName = String(process.argv[2]).toLowerCase() || 'start';

switch (scriptName) {
  case 'start':
    require('./start')();
    break;
  case 'build':
    require('./build')();
    break;
  case 'create':
    require('./create')();
    break;
  default:
    console.error('Script "' + scriptName + '" not found on VFE!');
}

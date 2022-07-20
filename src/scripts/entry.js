#!/usr/bin/env node

const scriptName = String(process.argv[2] || 'start').toLowerCase();
const target = String(process.argv[3] || 'chrome').toLowerCase();

switch (scriptName) {
  case 'start':
    require('./start')(target);
    break;
  case 'build':
    require('./build')(target);
    break;
  case 'create':
    require('./create')();
    break;
  default:
    console.error('Script "' + scriptName + '" not found on VFE!');
}

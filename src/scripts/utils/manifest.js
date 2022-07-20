const fs = require('fs');
const { appManifestPath } = require('./paths');

module.exports.getManifestContent = function(target) {
  let manifest = {};
  try {
    manifest = JSON.parse(fs.readFileSync(appManifestPath));
  } catch (exc) {};

  function processKey(key) {
    const keyTarget = key.includes('.') ? key.split('.')[0] : 'all';
    const originalKey = key.includes('.') ? key.substring(key.indexOf('.') + 1) : key;
    if (keyTarget === target || keyTarget === 'all') return originalKey;
  }

  function replacer(obj) {
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          replacer(item);
        }
      } else {
        for (const key in obj) {
          const originalKey = processKey(key);
          if (originalKey) {
            const aux = obj[key];
            delete obj[key];
            obj[originalKey] = aux;
          } else {
            delete obj[key];
          }
          replacer(obj[key]);
        }
      }
    }
  }
  replacer(manifest);

  manifest.version = process.env.VERSION || '1.0.0';

  if (target === 'chrome') {
    manifest.manifest_version = 3;
  } else {
    manifest.manifest_version = 2;
  }
  
  if (!manifest.permissions) manifest.permissions = [];
  if (!manifest.web_accessible_resources) manifest.web_accessible_resources = [];
  if (!manifest.background) manifest.background = {};

  if (!manifest.permissions.includes('scripting')) manifest.permissions.push('scripting');

  if (manifest.manifest_version === 3) {
    manifest.web_accessible_resources.push({
      resources: [ 'page.js' ],
      matches: [ '*://*/*' ],
    });
    manifest.background.service_worker = 'background.js';
    if (!manifest.host_permissions) manifest.host_permissions = [];
    if (!manifest.host_permissions.includes('*://*/*')) manifest.host_permissions.push('*://*/*');
    if (!manifest.incognito) manifest.incognito = 'split';
  } else {
    if (!manifest.web_accessible_resources.includes('page.js')) manifest.web_accessible_resources.push('page.js');
    if (!manifest.background.scripts) manifest.background.scripts = [];
    manifest.background.scripts.push('background.js');
    if (!manifest.incognito) manifest.incognito = 'spanning';
  }

  return manifest;
}

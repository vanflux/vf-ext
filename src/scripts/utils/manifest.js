const fs = require('fs');
const { appManifestPath } = require('./paths');

module.exports.getManifestContent = function() {
  let manifest = {};
  try {
    manifest = JSON.parse(fs.readFileSync(appManifestPath));
  } catch (exc) {}

  manifest.version = process.env.VERSION || '1.0.0';
  manifest.web_accessible_resources = [
    ...manifest.web_accessible_resources || [],
    {
      resources: [ "page.js" ],
      matches: [ "*://*/*" ],
    }
  ];
  return manifest;
}

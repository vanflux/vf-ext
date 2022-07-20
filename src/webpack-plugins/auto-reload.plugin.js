/**
 * Doesnt touch this unless you know what you are doing!
 */

const WebSocket = require('ws');

class AutoReloadPlugin {
  constructor({port}) {
    this.wss = new WebSocket.WebSocketServer({port});
    this.wss.on('connection', (client) => {
      console.log('[Auto Reload Plugin] Client connected, sending reload');
    });
  }

  apply(compiler) {
    compiler.hooks.done.tap(
      'Auto Reload Plugin',
      (stats) => {
        console.log('[Auto Reload Plugin] Sending reload to clients');
        this.wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            console.log('[Auto Reload Plugin] Sending reload to client');
            client.send("reload");
          }
        });
      }
    );
  }
}

module.exports = AutoReloadPlugin;

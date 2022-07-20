/**
 * Doesnt touch this unless you know what you are doing!
 */

const URLMatchPattern = require('url-match-pattern');

function connect() {
  try {
    console.log('[Auto Reload Plugin] Trying to connect to auto reload server...');
    const ws = new WebSocket('ws://localhost:8497'); // A random port

    ws.onopen = function open() {
      console.log('[Auto Reload Plugin] Websocket connected');
    };

    ws.onmessage = function message(data) {
      if (data?.data === 'reload') {
        console.log('[Auto Reload Plugin] Reload request');

        //@ts-ignore
        if (typeof chrome !== 'undefined') {
          console.log('[Auto Reload Plugin] Chrome reloading...');
          //@ts-ignore
          chrome.runtime.reload();
        } else {
          console.error('[Auto Reload Plugin] Unknown browser...');
        }
      }
    };

    ws.onerror = function (event) {
      console.log('[Auto Reload Plugin] Websocket error:', event);
    };

    ws.onclose = function(event) {  
      console.log('[Auto Reload Plugin] Websocket disconnected');
      setTimeout(() => connect(), 1000);
    }
  } catch (exc) {
    console.log('[Auto Reload Plugin] Websocket connect error');
    setTimeout(() => connect(), 1000);
  }
}

async function executeContent() {
  // @ts-ignore
  if (typeof chrome !== 'undefined') {
    chromeExecuteContent();
  }
}

async function chromeExecuteContent() {
  const queryOptions = {};
  // @ts-ignore
  const tabs = await chrome.tabs.query(queryOptions) || [];
  for (const tab of tabs) {
    if (tab.url == undefined) continue;
    try {
      let matched = false;
      for (const urlMatch of URL_MATCHES) {
        const match = URLMatchPattern.test(urlMatch, tab.url);
        console.log('[Auto Reload Plugin] Try match', urlMatch, tab.url, '=', match);
        if (match) {
          console.log('[Auto Reload Plugin] Matched!');
          matched = true;
          break;
        }
      }
      if (!matched) continue;

      console.log('[Auto Reload Plugin] Chrome executing content on', tab.title, tab.id);
      // @ts-ignore
      await chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ['content.js'],
        },
        (results: any) => {}
      );
    } catch (err) {
      console.error('Failed to execute script', err);
    }
  }
}

connect();
executeContent();

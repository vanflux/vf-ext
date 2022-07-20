const URLMatchPattern = require('url-match-pattern');

function connect() {
  try {
    console.log('[Auto Reload Plugin] Trying to connect to auto reload server...');
    const ws = new WebSocket('ws://localhost:8497'); // A random port

    ws.onopen = () => {
      console.log('[Auto Reload Plugin] Websocket connected');
    };

    ws.onmessage = data => {
      if (data?.data === 'reload') {
        console.log('[Auto Reload Plugin] Reload request');
        reloadExtension();
      }
    };

    ws.onerror = event => {
      console.log('[Auto Reload Plugin] Websocket error:', event);
    };

    ws.onclose = () => {  
      console.log('[Auto Reload Plugin] Websocket disconnected');
      setTimeout(() => connect(), 1000);
    };
  } catch (exc) {
    console.log('[Auto Reload Plugin] Websocket connect error');
    setTimeout(() => connect(), 1000);
  }
}

async function reloadExtension() {
  if (typeof chrome !== 'undefined') {
    chromeReloadExtension();
  } else {
    console.error('[Auto Reload Plugin] Unknown browser...');
  }
}

async function chromeReloadExtension() {
  console.log('[Auto Reload Plugin] Chrome reloading...');
  chrome.runtime.reload();
}

async function executeContent() {
  if (typeof chrome !== 'undefined') {
    chromeExecuteContent();
  } else {
    console.error('[Auto Reload Plugin] Unknown browser...');
  }
}

async function chromeExecuteContent() {
  const queryOptions = {};
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
      await chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ['content.js'],
        },
        () => {}
      );
    } catch (err) {
      console.error('Failed to execute script', err);
    }
  }
}

connect();
executeContent();

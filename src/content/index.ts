import * as appContent from "app-content";
import { runOnReady } from "../functions";

export async function main() {
  let scriptUrl: string;
  if (typeof chrome !== 'undefined') {
    if (typeof chrome.runtime.getURL === 'function') {
      scriptUrl = chrome.runtime.getURL('page.js');
    }
  }

  appContent.immediateEntry?.();
  runOnReady(['interactive', 'complete'], () => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
  });
  runOnReady(['complete'], () => appContent.pageLoadedEntry?.());
}

main();

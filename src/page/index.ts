import * as appPage from "app-page";
import { runOnReady } from "../functions";

export async function main() {
  appPage.immediateEntry?.();
  // Page script
  runOnReady(['complete'], () => {
    appPage.pageLoadedEntry?.();
  });
}

main();

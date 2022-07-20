# VFE Framework

A simple browser extension framework for creating extensions with typescript and react.

This is the continuation of [web-game-hacking-boilerplate](https://github.com/vanflux/web-game-hacking-boilerplate). It stills with hacking/modding intentions, but, anyway it could be used for anything.

# Usage

## Creating project

- Open terminal and go to a directory to setup the project
- Run the following command: `npx https://github.com/vanflux/vf-ext-framework create <YOUR_PROJECT_NAME>` (replacing the <...>)

After running these commands a project directory will be created and the dependencies will be installed:

<image src="docs/images/usage-npx.png" width="600"></image>

## Structure

After creating the project, the initial structure is very simple.

- `public`: Any file that you want to go to the final extension build.
  - `icon{X}.png`: Extension icon on different sizes.
  - `manifest.json`: Extension configuration for the browser.
- `src`: All source code
  - `background`: Source code for [background script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) of the extension
  - `content`: Source code for [content script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) of the extension
  - `page`: Source code for page script, this is a feature of the framework, all the code that is put here will be executed directly on the web-page, not content script. By default, the example react UI is rendered here, on the page.
  - `typings`: Typescript type files.
- `tsconfig.json`: Typescript configuration
- `webpack.config.js`: Custom webpack configuration

<image src="docs/images/usage-project-dir-struct.png" width="230"></image>

## Entrypoints

- Background script:
  - Exported `entry` function from `index.ts` or `index.tsx` file.
- Content script:
  - Exported `immediateEntry` function from `index.ts` or `index.tsx` file.
  - Exported `pageLoadedEntry` function from `index.ts` or `index.tsx` file.
- Page script:
  - Exported `immediateEntry` function from `index.ts` or `index.tsx` file.
  - Exported `pageLoadedEntry` function from `index.ts` or `index.tsx` file.

Execution order of content+page scripts:

- Browser loads the content script on the tab(`run_at: document_start`) the `immediateEntry` of content script is called.
- Content script wait for document ready `interactive` state and then creates a `script` element on the page, when the script loads the `immediateEntry` of page script is called.
- Content script wait for document ready `complete` state and then calls `pageLoadedEntry` of content script.
- Page script wait for document ready `complete` state and then calls `pageLoadedEntry` of page script.

## Running

Target is optional, by default is `chrome`, but it can be `firefox`.

- `npm start <target>` (calls the `vfe start` command).

## Build

Target is optional, by default is `chrome`, but it can be `firefox`.

- `npm run build <target>` (calls the `vfe build` command).

# Current features

- Cross-browser build (firefox & chrome)
- Page script (script executed directly on web page)
- React support
- Automatic extension reload
- Custom webpack configuration

# Goals

- API for request rewriting
- API for content <-> page communication

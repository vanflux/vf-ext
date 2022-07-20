import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';
import { App } from './components/app';

export async function immediateEntry() {
  console.log('[PageScript] immediateEntry from app');
}

export async function pageLoadedEntry() {
  console.log('[PageScript] pageLoadedEntry from app');

  // Remove UI if exists
  if (window.destroyVFE) window.destroyVFE();

  // Render the new UI
  const root = document.createElement('div');
  root.id = 'vfeRoot';
  document.body.appendChild(root);
  ReactDOM.render(<App></App>, root);
  window.destroyVFE = () => ReactDOM.unmountComponentAtNode(root);
}

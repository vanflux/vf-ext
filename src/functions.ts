
export function runOnReady(readyStates: DocumentReadyState[], fn: () => any) {
  const handler = () => {
    if (readyStates.includes(document.readyState)) {
      document.removeEventListener('readystatechange', handler);
      fn();
    }
  };
  if (readyStates.includes(document.readyState)) {
    handler();
  } else {
    document.addEventListener('readystatechange', handler);
  }
}

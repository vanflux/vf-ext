
declare module "*.css";

declare module 'app-background' {
  export function entry(): Promise<void>;
}

declare module 'app-content' {
  export function immediateEntry(): Promise<void>;
  export function pageLoadedEntry(): Promise<void>;
}

declare module 'app-page' {
  export function immediateEntry(): Promise<void>;
  export function pageLoadedEntry(): Promise<void>;
}

declare var URL_MATCHES: string[];
declare var AUTO_RELOADER: boolean;

declare var chrome: any;

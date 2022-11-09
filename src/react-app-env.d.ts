/// <reference types="react-scripts" />

declare module '*.module.css';
{
  const s: { readonly [key: string]: string };
  export = s;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_BASE_API_URL: string;
  }
}

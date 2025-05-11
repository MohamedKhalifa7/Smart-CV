/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string;
  readonly VITE_API_URL_LOCAL: string;
  readonly VITE_API_URL_PRODUCTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

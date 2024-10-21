/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL_LOCAL: string;
  readonly VITE_BACKEND_URL_REMOTE: string;
  readonly VITE_DRIVE_FOLDER : string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
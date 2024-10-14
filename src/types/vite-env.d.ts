/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    API_BASE_URL: string
    API_AUTH_KEY: string
    ALLOWED_CATEGORIES: {
      smartphone: string
      tablet: string
      smartwatch: string
    }
  }
}

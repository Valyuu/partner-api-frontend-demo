# Valyuu Partner API Frontend Demo

This project is a boilerplate for demonstrating the usage of Valyuu's Partner API.

Technology stack: React, TypeScript, Vite, TailwindCSS, Shadcn UI, React Query, Valtio, and React Router v6.

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and fill it with the content below:
```
# Replace with your API base URL
API_BASE_URL=https:/api-staging.valyuu.tech/partner

# Replace with your API authentication key
API_AUTH_KEY=22831168-cc5b-4b98-ba23-45a616bad65b

# Replace with actual categories and their UUIDs
ALLOWED_CATEGORIES={"smartphone":"139d13ce-10be-445d-b9bd-4a491871375d","tablet":"d19b12cb-328e-422d-b4e9-51cd91d0d621","smartwatch":"9badaeba-5264-49fa-ae0c-79188a766bde"}
```

## Development

To start the development server, run `npm run dev`. This will start Vite, which will serve your application with Hot Module Replacement (HMR).

## Updating API Server .d.ts Types

To update TypeScript types from the backend API server, run `npm run codegen`. This will fetch Swagger data from backend and generate a TypeScript .d.ts file to make sure that all frontend API calls are fully type-safe.

## Building

To build the project, run `npm run build`. This will first run TypeScript to check for type errors and then Vite to npmdle your application.

## Linting

To lint the project, run `npm run lint`. This will run ESLint on all `.ts` and `.tsx` files in the project.

## Project Structure

- `src/`: This is where your application's source code lives.
  - `index.tsx`: The entry point of your application. This is where the React Router is configured and the application is rendered.
  - `container.tsx`: This file serves as an entry point for embedding the main application. It's designed to encapsulate the actual `index.html` for testing purposes. In development mode, it's compiled into `container.html`, but it won't be compiled in production mode.
  - `assets/`: This directory contains static assets.
  - `components/`: This directory contains reusable React components.
  - `constants/`: This directory contains constants and enums used in this project.
  - `interfaces/`: This directory contains TypeScript types and interfaces.
  - `pages/`: This directory contains the pages of your application.
  - `queries/`: This directory contains React Query hooks for fetching/mutating the data from the backend API server.
  - `stores/`: This directory contains Valtio states used as stores for state management.
  - `types/`: This directory contains the api.d.ts which is automatically generated from backend API server's Swagger data.
  - `utils/`: This directory contains utility functions and other library code.
- `components.json`: This file contains configuration for Shadcn UI.
- `tsconfig.json`: This file contains configuration for TypeScript.
- `vite.config.ts`: This file contains configuration for Vite.
- `tailwind.config.js`: This file contains configuration for TailwindCSS.

## Routing

Routing is handled by React Router v6. The routes are defined in [`src/index.tsx`](src/main.tsx) using the `createBrowserRouter` function.

## Styling

Styling is done using TailwindCSS. The configuration for TailwindCSS is in [`tailwind.config.js`](tailwind.config.js).

## Shadcn UI

Shadcn UI is configured in [`components.json`](components.json). This file contains configuration for the UI library, including the style, whether to use `.tsx` files, and configuration for TailwindCSS.

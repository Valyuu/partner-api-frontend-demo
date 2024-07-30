# Valyuu Partner API Frontend Demo

This project is a boilerplate for demonstrating the usage of Valyuu's Partner API.

Technology stack: React, TypeScript, Vite, TailwindCSS, Shadcn UI, React Query, Valtio, and React Router v6.

## Getting Started

1. Clone the repository.
2. Install the dependencies using `pnpm install`.

## Development

To start the development server, run `pnpm dev`. This will start Vite, which will serve your application with Hot Module Replacement (HMR).

## Updating API Server .d.ts Types

To update TypeScript types from the backend API server, run `pnpm codegen`. This will fetch Swagger data from backend and generate a TypeScript .d.ts file to make sure that all frontend API calls are fully type-safe.

## Building

To build the project, run `pnpm build`. This will first run TypeScript to check for type errors and then Vite to bundle your application.

## Linting

To lint the project, run `pnpm lint`. This will run ESLint on all `.ts` and `.tsx` files in the project.

## Project Structure

- `src/`: This is where your application's source code lives.
  - `app.tsx`: The main component of your application.
  - `main.tsx`: The entry point of your application. This is where the React Router is configured and the application is rendered.
  - `components/`: This directory contains reusable React components.
  - `constants/`: This directory contains constants and enums used in this project.
  - `interfaces/`: This directory contains TypeScript types and interfaces.
  - `layouts/`: This directory contains React components used as layout parts.
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

Routing is handled by React Router v6. The routes are defined in [`src/main.tsx`](src/main.tsx) using the `createBrowserRouter` function.

## Styling

Styling is done using TailwindCSS. The configuration for TailwindCSS is in [`tailwind.config.js`](tailwind.config.js).

## Shadcn UI

Shadcn UI is configured in [`components.json`](components.json). This file contains configuration for the UI library, including the style, whether to use `.tsx` files, and configuration for TailwindCSS.

# Valyuu Partner API Frontend Demo

This project is a boilerplate for demonstrating the usage of Valyuu's Partner API.

Technology stack: React, TypeScript, Vite, TailwindCSS, Shadcn UI, React Query, Valtio, and React Router v6.

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and fill it with the content below:
```
API_BASE_URL=https://api.example.com   # Replace with your API base URL
API_AUTH_KEY=your_auth_key_here        # Replace with your API authentication key
ALLOWED_CATEGORIES={"smartphone":"smartphone_uuid_here","tablet":"tablet_uuid_here","smartwatch":"smartwatch_uuid_here"}  # Replace with actual UUIDs
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

Routing is handled by React Router v6. The routes are defined in [`src/index.tsx`](src/main.tsx) using the `createBrowserRouter` function.

## Styling

Styling is done using TailwindCSS. The configuration for TailwindCSS is in [`tailwind.config.js`](tailwind.config.js).

## Shadcn UI

Shadcn UI is configured in [`components.json`](components.json). This file contains configuration for the UI library, including the style, whether to use `.tsx` files, and configuration for TailwindCSS.

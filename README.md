# Alma – Frontend Technical Test

This repository contains my implementation of the Alma frontend technical test.  
The goal is to display a list of payments, payment details, and the associated payment schedule using a mocked API.

## 🧱 Tech Stack

- React + TS
- Vite
- SWR
- Tailwind
- Vitest + Testing Library
- Cypress

## 🚀 Getting Started

### Run the mock API

- Import the provided Mockoon export file using the Open local environment button
- Run the mock server locally (default: http://localhost:3001)

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

The API base URL is configured via `VITE_API_URL` (in `.env` and `cypress.env.json`), for example:

```bash
VITE_API_URL=http://localhost:3001
```

Make sure the server is running!

### Run unit tests and coverage

```bash
npm run test
npm run coverage
```

### Run end‑to‑end tests (Cypress)

Headless run:

```bash
npm run test:e2e
```

Open Cypress UI:

```bash
npm run test:e2e:open
```

## Implemented Features

- List payments
- View payment details
- Display payment schedule
- Loading and error states

## Technical Decisions

- SWR is used for API data fetching with built-in loading, error, and cache handling
- Business logic is extracted to keep components focused on rendering
- Cypress is used for a minimal end-to-end flow to validate critical user paths

## 🔍 Possible Improvements

- Strengthen E2E tests (frontend–backend contract): assert that the data displayed in the UI matches the API response

- Improve UI polish and accessibility

- Add CI to automatically run tests

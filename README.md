# Typescript + Express + Firebase + NextJS + MUI Project

This project is a monorepo that contains a [Next.js](https://nextjs.org/) app and a [Express](https://expressjs.com/) app.

## How to run the project

Run the following command:

```sh
npm install
npm run dev
```

## How to run with firebase emulator

```sh
cd apps/backend
firebase emulators:start
```
check the firebase emulator url from the terminal
put the url in the .env file

example:
```sh
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIRESTORE_EMULATOR_HOST=localhost:8080
```

## What's inside?

### Apps and Packages

- `frontend`: a [Next.js](https://nextjs.org/) app
- `backend`: a [Express](https://expressjs.com/) app + Firebase Authentication + Firebase Firestore
- `@repo/entity`: a shared entity library

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
npm run build
```
# Web.LitMusic

Web.LitMusic is the front end for Lit Music

## Prerequisites

1. [Nodejs](https://nodejs.org/en/)

## Setup Env

Create a `.env` file in the root directory and then add `NEXT_PUBLIC_REACT_APP_API` variable in the `.env`

```bash
# .env
NEXT_PUBLIC_REACT_APP_API = http://localhost:5000
```

## Install dependencies

```bash
$ npm ci
```

## Available Scripts for development

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

```bash
$ npm run dev
```

Clear out any stuck node processes.

```bash
$ npm run clean
```

## Available Scripts for production

Generates an optimized version of the application for production.

```bash
$ npm run build
```

To run in production mode

```bash
$ npm run start
```
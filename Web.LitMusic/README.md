# Web.LitMusic

Web.LitMusic is the front end for Lit Music

## Prerequisites

1. [nodejs](https://nodejs.org/en/)
2. [Api.Music](https://github.com/pacna/Api.Music)
3. [docker](https://docs.docker.com/install/) (optional)
4. [docker-compose](https://docs.docker.com/compose/install/) (optional)

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

```bash
$ npm run dev
```

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

```bash
$ npm run clean
```

Clear out any stuck node processes.

## Available Scripts for production

```bash
$ npm run build
```

Generates an optimized version of the application for production.

```bash
$ npm run start
```

To run in production mode

## Docker command for production (Optional)

```bash
$ docker-compose up --build
```

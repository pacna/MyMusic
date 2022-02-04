# Api Music

The backend for the [React Music Player](https://github.com/pacna/react-music-player)

## Prerequisites

1. [dotnet core](https://dotnet.microsoft.com/en-us/download)
2. [docker](https://docs.docker.com/install/) (optional)
3. [docker-compose](https://docs.docker.com/compose/install/) (optional)

## How to run locally

```bash
# cd src folder
$ cd src

# run cmd
$ dotnet run

# run cmd (watch mode)
$ dotnet watch run
```

## How to run tests

```bash
# cd tests folder
$ cd tests

# test cmd
$ dotnet test
```

## How to run in production

```bash
# publish cmd
$ dotnet publish ./src -c Release -o server

# cd server folder
$ cd server

# run the binary
$ ./Api.Music
```

## How to run in docker (Optional)

```bash
$ docker-compose up --build
```

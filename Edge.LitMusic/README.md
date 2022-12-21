# Edge Lit Music

The edge service for Lit Music

## Prerequisites

1. [.NET Core](https://dotnet.microsoft.com/en-us/download)
2. [MongoDB](https://www.mongodb.com/try/download/community)
3. [Docker](https://docs.docker.com/install/) (optional)
4. [Docker Compose](https://docs.docker.com/compose/install/) (optional)

## How to run locally

```bash
# cd src/Edge.LitMusic directory
$ cd src/Edge.LitMusic

# run cmd
$ dotnet run

# run cmd using inmemory
$ dotnet run --inmemory

# run cmd (watch mode)
$ dotnet watch run

# run cmd (watch mode) using inmemory
$ dotnet watch run --inmemory
```

## How to run tests

```bash
# cd tests/Edge.LitMusic.Tests directory
$ cd tests/Edge.LitMusic.Tests

# test cmd
$ dotnet test
```

## How to run in production

```bash
# cd src/Edge.LitMusic directory
$ cd src/Edge.LitMusic

# publish cmd
$ dotnet publish -c Release -o out

# cd out directory
$ cd out

# run the binary
$ ./Edge.LitMusic
```

## How to run in docker (Optional)

```bash
$ docker-compose up --build
```

**note**: Docker runs using the inmemory implementation.

# Edge Lit Music

The edge service for Lit Music

## Prerequisites

1. [dotnet core](https://dotnet.microsoft.com/en-us/download)
2. [mongoDB](https://www.mongodb.com/try/download/community)
3. [docker](https://docs.docker.com/install/) (optional)
4. [docker-compose](https://docs.docker.com/compose/install/) (optional)

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
# cd src/Edge.LitMusic directory
$ cd src/Edge.LitMusic

# publish cmd
$ dotnet publish -c Release -o out

# cd out folder
$ cd out

# run the binary
$ ./Edge.LitMusic
```

## How to run in docker (Optional)

```bash
$ docker-compose up --build
```

**note**: You will need to switch the `ConnectionString` [here](./src/appsettings.json) to be `mongodb://musicdb:27017` before running it in docker
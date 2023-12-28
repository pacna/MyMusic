# Edge.MyMusic

Welcome to the engine room of MyMusic, where all the technical magic happens to ensure your music experience is smooth and enjoyable.

## How to Run Locally

Navigate to the `src/Edge.MyMusic` directory and run:

```bash
$ dotnet run
```

### Flags

-   `-inmemory` : Enables the use of in-memory datastore.

```bash
$ dotnet run -inmemory
```

-   `-webapp` : Empowers the backend to embed the frontend.
    -   **Note**: Make sure to place the frontend in the `wwwroot` folder for it to work.

```bash
$ dotnet run -webapp
```

-   `audios`: Specify the folder or file path for your audio files. This enables you to seamlessly embed the files in the server for efficient access.

```bash
$ dotnet run --audios=path/to/folder/or/file
```

## How to Run Tests

Execute the following command:

```bash
$ dotnet test
```

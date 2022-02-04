FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env

RUN mkdir /app
WORKDIR /app

# Copying the current directory to the /app folder
COPY . /app
RUN dotnet test ./tests

RUN dotnet publish ./src -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["./Api.Music"]
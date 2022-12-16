FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

RUN mkdir /edge
WORKDIR /edge

# Copying the current directory to the /edge directory
COPY . /edge
RUN dotnet test

RUN dotnet publish ./src/Edge.LitMusic -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /edge
COPY --from=build-env /edge/out .
ENTRYPOINT ["./Edge.LitMusic", "inmemory=true"]

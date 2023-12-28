## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
##
## Usage:
##   - make up           : Build and run the application
##   - make server       : Run the server locally
##   - make web          : Run the web locally
##   - make install      : Install node module dependencies
##   - make dist         : Build the UI distribution and copy it to fs/dist
##   - make help         : Show available commands and descriptions
##

.PHONY:up
up:
	make dist
	cd ./Edge.MyMusic/src/Edge.MyMusic && \
	dotnet publish -c Release -o out
	cd ./Edge.MyMusic/src/Edge.MyMusic/out && \
	./Edge.MyMusic -inmemory -webapp

.PHONY:server
server:
	dotnet watch run -inmemory --project=./Edge.MyMusic/src/Edge.MyMusic

.PHONY:web
web:
	make install
	npm run dev --prefix=Web.MyMusic

.PHONY:install
install:
	if [ ! -d "./Web.MyMusic/node_modules" ]; then \
		npm ci --prefix Web.MyMusic; \
	else \
		echo "Skipping npm ci."; \
	fi

.PHONY:dist
dist:
	make install
	npm run build --prefix=Web.MyMusic
	cp -r Web.MyMusic/dist/* Edge.MyMusic/src/Edge.MyMusic/wwwroot

.PHONY:help
help:
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)
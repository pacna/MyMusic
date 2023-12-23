## ----------------------------------------------------------------------
## The purpose of this Makefile is to simplify common development tasks.
## ----------------------------------------------------------------------
##
## Usage:
##   - make up           : Build and run the application
##   - make build        : Build the application
##   - make server       : Run the server locally
##   - make web          : Run the web locally
##   - make dist         : Build the UI distribution and copy it to fs/dist
##   - make help         : Show available commands and descriptions
##


.PHONY:server
server:
	dotnet watch run --project=./Edge.MyMusic/src/Edge.MyMusic

.PHONY:web
web:
	npm run dev --prefix=Web.MyMusic

.PHONY:dist
dist:
	npm run build --prefix=Web.MyMusic
	cp -r Web.MyMusic/dist/* Edge.MyMusic/src/Edge.MyMusic/wwwroot

.PHONY:help
help:
	@sed -ne '/@sed/!s/##//p' $(MAKEFILE_LIST)
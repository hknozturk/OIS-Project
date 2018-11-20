## How to set up environments

- First install necessary node modules. Run `npm install` in OIS-Project and OIS-Project/backend.
- Be sure that your mysql server up & running
- Check OIS-Project/backend/server.js file. Be sure that mysql parameters are correct (dbname, password, ...)
- To run the node server `node server.js` while you are in backend. Our server runs on localhost 8000 port. If you want you can change the port.
- To run Angular front-end check below.
- Be sure that backend and frontend running in different console.

# OISFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Formating

Please use TSLint and Prettier

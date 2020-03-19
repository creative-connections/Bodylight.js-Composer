# Bodylight.js Composer v2

<img src="/icons/logo_light.svg?sanitize=true" alt="Bodylight.js Composer" width="40%">

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

For more information, go to https://aurelia.io/docs/cli/webpack

## Getting started
Preparing OS. You need to install `git` and `npm`, in order to have all recommended settings 
you may use virtual machine configuration at https://github.com/creative-connections/Bodylight-VirtualMachine 

Preparing and building Bodylight.js:

- `git clone https://github.com/creative-connections/Bodylight.js-Composer` Clone repository 
- `cd Bodylight.js-Composer` Go to directory 
- `git checkout dev-v2tk` switch to development branch
- You need to install `npm` into your operating system, e.g. by installing nodejs.
- `npm install`. This installs all depended packages for this application

## Build app
Execute both of the following:
`au build` - builds basic composer application into /dist folder
`au buildcomp` - builds 'bodylight.bundle.js' needed by webcomponents
  
There is web application built in `dist/` directory. You may run it as in next section or you may map this directory as alias in Apache.
   

## Run dev app

Run `npm start`, then open `http://localhost:8080`

You can change the standard webpack configurations from CLI easily with something like this: `npm start -- --open --port 8888`. However, it is better to change the respective npm scripts or `webpack.config.js` with these options, as per your need.

To enable Webpack Bundle Analyzer, do `npm run analyze` (production build).

To enable hot module reload, do `npm start -- --hmr`.

To change dev server port, do `npm start -- --port 8888`.

To change dev server host, do `npm start -- --host 127.0.0.1`

**PS:** You could mix all the flags as well, `npm start -- --host 127.0.0.1 --port 7070 --open --hmr`

For long time aurelia-cli user, you can still use `au run` with those arguments like `au run --env prod --open --hmr`. But `au run` now simply executes `npm start` command.

## Build for production

Run `npm run build`, or the old way `au build --env prod`.

## Unit tests

Run `au test` (or `au jest`).

To run in watch mode, `au test --watch` or `au jest --watch`.

## Integration (e2e) tests

You need the app running for integration test.
/
First, run `au run` and keep it running.

Then run `au protractor`.

To perform a test-run in interactive mode, do `au protractor`.

To ask the `protractor` to start the application first and then start testing: `au protractor --headless --start`

The two following flags are useful when using `--start` flag:
 * To change dev server port, do `au protractor --start --port 8888`.
 * To change dev server host, do `au protractor --start --host 127.0.0.1`


**PS:** It is also possible to mix the flags `au protractor --headless --start --port 7070 --host 127.0.0.1`

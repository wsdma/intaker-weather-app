# Weather App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Installation Steps

1. Install project dependencies

```bash
npm install
```

2. Add OpenWeather API key to **src/core/src/environments/environment.ts**

```bash
openWeatherApiKey: 'b1a846571092553aa3a96455ed21f279'
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Troubleshooting

1. While installing project dependencies you may face errors because of NGRX doesn't support Angluar v19 yet. To fix this please run:

```bash
npm install --force
```

2. If tests are failing, please try to re-execute them

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  thisUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:4000',
  foodServiceUrl: 'http://localhost:9090',
  questionnaireServiceUrl: 'http://localhost:9080',
  userServiceUrl: 'http://localhost:9070'
};

// export const environment = {
//   production: true,
//   thisUrl: 'https://ffqquestionnairewestatic.z22.web.core.windows.net',
//   apiUrl: 'https://ffq-auth.azurewebsites.net',
//   foodServiceUrl: 'https://ffq-food-item-service.azurewebsites.net',
//   questionnaireServiceUrl: 'https://ffq-questionnaire-service.azurewebsites.net',
//   userServiceUrl: 'https://ffq-user-service.azurewebsites.net'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

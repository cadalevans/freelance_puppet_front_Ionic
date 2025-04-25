// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8082' ,  //'http://10.0.2.2:8082' , //'http://localhost:8082' ,//'http://192.168.1.11:8082' , 'https://967b-196-178-197-114.ngrok-free.app' , // Change this when deploying
  stripePublishableKey: 'pk_test_51Qc9yTPdPnsmJ4f7WlPAoT0ujYdkD0X5oMW5T7oiWGp1Gg3xkh6JWAqZK6R4T6sEE7xQ4N5cfqqSrPFVJaNCx84i00iWsCgPl2'  // PUT YOUR STRIPE PUBLISHABLE KEY HERE
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

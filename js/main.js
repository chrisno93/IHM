/**
 * Main AngularJS Web Application
 */
var app = angular.module('myApp', [ 'ui.router']);

/**
 * Configure the Routes
 */
app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $stateProvider
        .state('home', {
        url: '/home',
        //url: '/home/:{CT}'
        templateUrl: 'partials/home.html',
        controller: 'AppCtrl'
      })
}]);
